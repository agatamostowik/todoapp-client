import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { DropdownOptions } from "../DropdownOptions/DropdownOptions";
import { StatusDropdown } from "../DropdownOptions/StatusDropdown";
import { TodoList } from "../TodoList/TodoList";
import { updateTodo } from "../../helpers";
import { editTodo } from "../../redux/slices/todosSlice";
import { Tag } from "../Tag/Tag";
import "./Todo.scss";

export const Todo = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.todo.label);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleEditValue = (event) => {
    setEditValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await updateTodo(props.todo.id, { label: editValue });
      dispatch(editTodo(response));
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const isTagExist = props.todo.tags.length !== 0;
  return (
    <>
      <div className="row-container">
        <div className="todo-container">
          <div className="todo__color"></div>
          {isEdit ? (
            <form className="add-new-form" onSubmit={handleSubmit}>
              <input
                className="add-new-input"
                value={editValue}
                onChange={handleEditValue}
                autoFocus={true}
              />
              <button className="btn" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          ) : (
            <div className="todo__label__wrapper">
              <div className="todo__label">{props.todo.label}</div>
              {isTagExist ? <Tag tags={props.todo.tags} /> : null}
            </div>
          )}
          <StatusDropdown todo={props.todo} />
          <div className="chevron-container" onClick={handleClick}>
            {isOpen ? <FiChevronDown /> : <FiChevronUp />}
          </div>
        </div>
        <DropdownOptions todoId={props.todo.id} handleEdit={handleEdit} />
      </div>
      {isOpen ? (
        <TodoList
          isRoot={false}
          todos={filteredTodos}
          ancestorsIds={[...props.todo.ancestorsIds, props.todo.id]}
          parentId={props.todo.id}
        />
      ) : null}
    </>
  );
};
