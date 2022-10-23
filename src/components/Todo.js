import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Checkbox } from "./Checkbox";
import { DropdownOptions } from "./DropdownOptions";
import { TodoList } from "./TodoList";
import { getUrl } from "../helpers";
import { editTodo } from "../redux/slices/todosSlice";

const updateTodo = async (todoId, data) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos/${todoId}`, {
    method: "PUT",
    body: JSON.stringify({ value: data }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const Todo = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.todo.label);

  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    return state.todos.data;
  });

  const filteredTodos = todos.filter((todo) => {
    return todo.parentId === props.todo.id;
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleIsDropdownOpen = (value) => {
    setIsDropdownOpen(value);
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleEditValue = (event) => {
    setEditValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateTodo(props.todo.id, editValue);
      dispatch(editTodo(response));
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group">
      <div className="row-container">
        <div className="todo-container">
          <Checkbox todo={props.todo} />
          {isEdit ? (
            <form onSubmit={handleSubmit}>
              <input value={editValue} onChange={handleEditValue} />
            </form>
          ) : (
            <div className="todo-label">{props.todo.label}</div>
          )}
          <div className="chevron-container" onClick={handleClick}>
            {isOpen ? <FiChevronDown /> : <FiChevronUp />}
          </div>
        </div>
        <DropdownOptions
          todoId={props.todo.id}
          isDropdownOpen={isDropdownOpen}
          handleDropdownClick={handleDropdownClick}
          handleIsDropdownOpen={handleIsDropdownOpen}
          handleEdit={handleEdit}
        />
      </div>
      {isOpen ? (
        <TodoList
          isRoot={false}
          todos={filteredTodos}
          ancestorsIds={[...props.todo.ancestorsIds, props.todo.id]}
          parentId={props.todo.id}
        />
      ) : null}
    </div>
  );
};
