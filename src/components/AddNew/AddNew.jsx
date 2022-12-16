import { useState } from "react";
import { Input } from "../Input";
import "./AddNew.scss";

export const AddNew = (props) => {
  const {
    onSubmit,
    value,
    onChange,
    isLoading,
    label,
    placeholder,
    isAddButtonDisabled,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const handleClick = () => {
    setEditMode(!editMode);
  };

  const isButtonDisabled =
    isLoading || value.length === 0 || isAddButtonDisabled;

  return (
    <>
      <div id="add-new">
        {label ? <label className="label">{label}</label> : null}
        {!editMode ? (
          <div className="add-new__label todo-container" onClick={handleClick}>
            {placeholder}
          </div>
        ) : (
          <div className="add-new__form">
            <Input
              type="text"
              onChange={onChange}
              value={value}
              autofocus={true}
            />

            <div className="add-new__btn-cointainer">
              <button
                className="btn"
                type="submit"
                disabled={isButtonDisabled}
                onClick={onSubmit}
              >
                {isLoading ? <div className="loader"></div> : "Add"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
