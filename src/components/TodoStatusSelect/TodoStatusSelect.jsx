import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../../redux/slices/todosSlice";
import { status, statusOptions, updateTodo } from "../../helpers";
import { Dropdown } from "../Dropdown/Dropdown";
import "./TodoStatusSelect.scss";

export const TodoStatusSelect = (props) => {
  const { todo } = props;
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  const ref = useRef();

  const outsideClick = (event) => {
    if (!ref.current.contains(event.target)) {
      setIsStatusDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", outsideClick);
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  });

  const handleStatusDropdown = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const updateStatus = async (status) => {
    console.log("updateStatus!!!");
    try {
      const body = { status: status };
      const response = await updateTodo(props.todo.id, body);
      console.log("response: ", response);
      dispatch(editTodo(response));
      setIsStatusDropdownOpen(false);
    } catch (error) {}
  };

  return (
    <div ref={ref} id="todo-status-select">
      <div className="todo-status__label" onClick={handleStatusDropdown}>
        {status[todo.status]}
      </div>
      {isStatusDropdownOpen ? (
        <Dropdown
          isStatusDropdownOpen={isStatusDropdownOpen}
          options={statusOptions}
          handleClick={updateStatus}
        />
      ) : null}
    </div>
  );
};
