import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../../redux/slices/todosSlice";
import { updateTodo } from "../../helpers";

export const StatusDropdown = (props) => {
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

  const handleStatus = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const updateStatus = async (status) => {
    try {
      const response = await updateTodo(props.todo.id, { status: status });
      dispatch(editTodo(response));
      setIsStatusDropdownOpen(false);
    } catch (error) {}
  };

  return (
    <div ref={ref} id="status" className="status-dropdown-container">
      <div onClick={handleStatus}>{todo.status}</div>
      {isStatusDropdownOpen ? (
        <div className={`dropdown${isStatusDropdownOpen ? "-open" : ""}`}>
          <div
            className="dropdown-item"
            onClick={() => {
              updateStatus("new");
            }}
          >
            New
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              updateStatus("in_progress");
            }}
          >
            In progress
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              updateStatus("done");
            }}
          >
            Done
          </div>
        </div>
      ) : null}
    </div>
  );
};
