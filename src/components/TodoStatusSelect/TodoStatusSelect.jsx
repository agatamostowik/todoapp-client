import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../../redux/slices/todosSlice";
import { status, statusOptions, updateTodo } from "../../helpers";
import { Dropdown } from "../Dropdown/Dropdown";
import "./TodoStatusSelect.scss";

export const TodoStatusSelect = (props) => {
  const { todo } = props;

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const ref = useRef();

  const outsideClick = (event) => {
    if (!ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleStatusDropdown = () => {
    setIsOpen(!isOpen);
  };

  const updateStatus = async (status) => {
    try {
      const body = { status: status };
      const response = await updateTodo(props.todo.id, body);

      dispatch(editTodo(response));
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", outsideClick);
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  });

  return (
    <div ref={ref} id="todo-status-select">
      <div className="todo-status-select__content">
        <div
          className="todo-status-select__label"
          onClick={handleStatusDropdown}
        >
          {status[todo.status]}
        </div>
        {isOpen ? (
          <Dropdown options={statusOptions} onSelect={updateStatus} />
        ) : null}
      </div>
    </div>
  );
};
