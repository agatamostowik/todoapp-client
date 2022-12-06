import { Input } from "../Input";
import "./editTodo.scss";

export const EditTodo = (props) => {
  const { handleSubmit, editValue, handleEditValue, isLoading } = props;

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          id="label"
          label="Todo name"
          value={editValue}
          onChange={handleEditValue}
          type="text"
        />

        <div className="todo-container">SELECT STATUS</div>
        <div className="todo-container">MULTISELECT</div>
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
    </>
  );
};
