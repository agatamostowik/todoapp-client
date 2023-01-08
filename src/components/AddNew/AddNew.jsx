import { useState } from "react";
import { Button } from "../Button/Button";
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
    isDisabled,
  } = props;

  const [editMode, setEditMode] = useState(false);

  const handleClick = () => {
    setEditMode(true);
  };

  const handleSubmit = async (event) => {
    await onSubmit(event);
    setEditMode(false);
  };

  const isEmpty = value.length === 0;

  const isButtonDisabled = isEmpty || isDisabled;

  return (
    <div id="add-new">
      {label ? <label className="label">{label}</label> : null}
      {!editMode ? (
        <div className="add-new__placeholder input" onClick={handleClick}>
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

          <div className="add-new__button">
            <Button
              type="submit"
              onClick={handleSubmit}
              isDisabled={isButtonDisabled}
              isLoading={isLoading}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
