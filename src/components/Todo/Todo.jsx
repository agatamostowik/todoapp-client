import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { DropdownOptions } from "../DropdownOptions/DropdownOptions";
import { TodoList } from "../TodoList/TodoList";
import { updateTodo } from "../../helpers";
import { editTodo } from "../../redux/slices/todosSlice";
import { Tag } from "../Tag/Tag";
import "./Todo.scss";
import { Modal } from "../Modal";
import { EditTodo } from "../EditTodo/EditTodo";
import { StatusSelect } from "../StatusSelect/StatusSelect";
import { SettingsSelect } from "../SettingsSelect/SettingsSelect";

export const Todo = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const todos = useSelector((state) => {
    return state.todos.data;
  });

  const filteredTodos = todos.filter((todo) => {
    return todo.parentId === props.todo.id;
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const isTagExist = props.todo.tags.length !== 0;

  return (
    <>
      <div className="row-container">
        <div className="todo-container">
          <div className="todo__color"></div>
          <div className="todo__label__wrapper">
            <div className="todo__label">{props.todo.label}</div>
            {isTagExist ? <Tag tags={props.todo.tags} /> : null}
          </div>
          <StatusSelect todo={props.todo} />
          <div className="chevron-container" onClick={handleClick}>
            {isOpen ? <FiChevronDown /> : <FiChevronUp />}
          </div>
        </div>
        <SettingsSelect todo={props.todo} />
        {/* <DropdownOptions todoId={props.todo.id} handleEdit={handleEdit} /> */}
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
