import { Input } from "../Input";
import { FiX } from "react-icons/fi";
import { ModalStatusSelect } from "../ModalStatusSelect/ModalStatusSelect";
import "./editTodo.scss";
import { ModalMultiselect } from "../ModalMultiselect/ModalMultiselect";

export const EditTodo = (props) => {
  const { handleSubmit, editValue, handleEditValue, isLoading, onClose } =
    props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <>
      <div className="edit-todo__exit" onClick={handleClose}>
        <FiX />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="edit-todo__inputs">
            <h3 className="edit-todo__title">Edit todo</h3>
            <Input
              id="label"
              label="Todo name"
              value={editValue}
              onChange={handleEditValue}
              type="text"
            />
            <ModalStatusSelect />
            <ModalMultiselect />
            {/* <div className="todo-container">MULTISELECT</div> */}
          </div>
          <div className="edit-todo__buttons">
            <div className="edit-todo__cancel" onClick={handleClose}>
              Cancel
            </div>
            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
