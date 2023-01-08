import { Input } from "../Input";

import { ModalStatusSelect } from "../ModalStatusSelect/ModalStatusSelect";
import { ModalMultiselect } from "../ModalMultiselect/ModalMultiselect";
import { updateTodo } from "../../helpers";
import { editTodo } from "../../redux/slices/todosSlice";
import { useDispatch } from "react-redux";
import "./editTodo.scss";
import { useState } from "react";

export const EditTodo = (props) => {
  const { isLoading, onClose, todo } = props;

  const [todoLabelValue, setTodoLabelValue] = useState(props.todo.label);
  const [selectedStatusOption, setSelectedStatusOption] = useState(todo.status);
  const [currentTags, setCurrentTags] = useState(todo.tags);

  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(false);
  };

  const handleSetTodoLabelValue = (event) => {
    setTodoLabelValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const addedTags = currentTags.filter((tag) => !todo.tags.includes(tag));
    const removedTags = todo.tags.filter((tag) => !currentTags.includes(tag));

    try {
      const body = {
        label: todoLabelValue,
        status: selectedStatusOption,
        removedTags: removedTags,
        addedTags: addedTags,
      };

      const todo = await updateTodo(props.todo.id, body);

      dispatch(editTodo(todo));
      onClose(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="edit-todo">
      <div className="edit-todo__inputs">
        <h2 className="edit-todo__title">Edit todo</h2>
        <Input
          id="label"
          label="Todo label"
          value={todoLabelValue}
          onChange={handleSetTodoLabelValue}
          type="text"
        />
        <ModalStatusSelect
          value={selectedStatusOption}
          onChange={setSelectedStatusOption}
        />
        <ModalMultiselect value={currentTags} onChange={setCurrentTags} />
      </div>
      <div className="edit-todo__buttons">
        <div className="edit-todo__cancel" onClick={handleClose}>
          Cancel
        </div>
        <button
          onClick={handleSubmit}
          className="btn"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loader-container">
              <div className="loader" />
            </div>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
};
