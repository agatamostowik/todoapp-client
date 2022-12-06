import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../../redux/slices/todosSlice";
import { updateTodo } from "../../helpers";
import { Dropdown } from "../Dropdown/Dropdown";

export const StatusSelect = (props) => {
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
    try {
      const response = await updateTodo(props.todo.id, { status: status });
      dispatch(editTodo(response));
      setIsStatusDropdownOpen(false);
    } catch (error) {}
  };

  const options = [
    { label: "New", value: "new" },
    { label: "In progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ];

  return (
    <div ref={ref} id="status" className="status-dropdown-container">
      <div onClick={handleStatusDropdown}>{todo.status}</div>
      {isStatusDropdownOpen ? (
        <Dropdown
          isStatusDropdownOpen={isStatusDropdownOpen}
          options={options}
          handleClick={updateStatus}
        />
      ) : null}
    </div>
  );
};
