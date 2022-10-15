import { useState, useEffect, useRef } from "react";
import { Checkbox } from "./Checkbox";
import { TodoList } from "./TodoList";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../redux/slices/todosSlice";
import classNames from "classnames";

const Options = (props) => {
  const {
    isDropdownOpen,
    handleDropdownClick,
    handleEdit,
    handleRemove,
    handleIsDropdownOpen,
  } = props;

  const ref = useRef();

  const outsideClick = (event) => {
    if (!ref.current.contains(event.target)) {
      handleIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", outsideClick);
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  });
  return (
    <div ref={ref} className="dropdown-container" open={isDropdownOpen}>
      <svg
        onClick={handleDropdownClick}
        xmlns="http://www.w3.org/2000/svg"
        id="Outline"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <circle cx="12" cy="2" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="22" r="2" />
      </svg>
      <div className={`dropdown${isDropdownOpen ? "-open" : ""}`}>
        {isDropdownOpen ? (
          <>
            <div className="dropdown-item" onClick={handleEdit}>
              Edit
            </div>
            <div className="dropdown-item" onClick={handleRemove}>
              Remove
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

const EditModeTodo = () => {
  return (
    <form className="add-new">
      <input className="add-new" type="text" autoFocus={true}></input>
      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
};

const StaticTodo = (props) => {
  const { hasSubtasks, isOpen, isChecked, handleClick, todo } = props;
  const todoContainerClass = classNames({
    "todo-container": !isChecked,
    "todo-container-checked": isChecked,
  });
  return (
    <div className={todoContainerClass}>
      {!hasSubtasks ? <Checkbox todo={todo} isChecked={isChecked} /> : null}
      <div className="label">{todo.label}</div>
      <div>
        {hasSubtasks ? (
          <div className={isOpen ? "isOpen" : ""} onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
            >
              <path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const Todo = (props) => {
  const { todo } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();

  const checkedIds = useSelector((state) => {
    return state.checkbox.checkedIds;
  });

  const hasSubtasks = todo.subtasks.length !== 0;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const isChecked = hasSubtasks
    ? todo.subtasks.every((subtask) => checkedIds.includes(subtask.id))
    : checkedIds.includes(todo.id);

  const handleIsDropdownOpen = (value) => {
    setIsDropdownOpen(value);
  };

  const handleRemove = (id) => {
    dispatch(
      removeTodo({
        id: todo.id,
      })
    );
  };

  return (
    <>
      <div className="todo-container-context">
        {isEditMode ? (
          <EditModeTodo />
        ) : (
          <StaticTodo
            isOpen={isOpen}
            isChecked={isChecked}
            hasSubtasks={hasSubtasks}
            handleClick={handleClick}
            todo={todo}
          />
        )}

        <Options
          handleIsDropdownOpen={handleIsDropdownOpen}
          isDropdownOpen={isDropdownOpen}
          handleDropdownClick={handleDropdownClick}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
        />
      </div>
      {hasSubtasks && isOpen ? (
        <TodoList isRoot={false} todos={todo.subtasks} />
      ) : null}
    </>
  );
};
