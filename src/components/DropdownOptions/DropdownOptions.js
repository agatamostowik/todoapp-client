import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import { deleteTodo } from "../../redux/slices/todosSlice";
import { getUrl } from "../../helpers";
import "./DropdownOptions.scss";

const removeTodo = async (todoId) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos/${todoId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export const DropdownOptions = (props) => {
  const { todoId, handleEdit } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  const outsideClick = (event) => {
    if (!ref.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", outsideClick);
    return () => {
      window.removeEventListener("click", outsideClick);
    };
  });

  const handleRemove = async () => {
    try {
      const response = await removeTodo(todoId);

      dispatch(deleteTodo({ todoIds: response }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div
      id="options"
      className="dropdown-icon"
      ref={ref}
      onClick={handleDropdownClick}
      open={isDropdownOpen}
    >
      <FiMoreVertical />
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
