import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todosSlice";

export const AddNew = () => {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    setEditMode(!editMode);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addTodo({
        label: value,
      })
    );

    setValue("");
    setEditMode(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div className="add-new">
        {!editMode ? (
          <input
            className="add-new"
            type="text"
            placeholder="Add new"
            onClick={handleClick}
          ></input>
        ) : (
          <form className="addingNew" onSubmit={handleSubmit}>
            <input
              className="add-new"
              type="text"
              onChange={handleChange}
              value={value}
              autoFocus={true}
            ></input>
            <button className="btn" type="submit">
              Add
            </button>
          </form>
        )}
      </div>
    </>
  );
};
