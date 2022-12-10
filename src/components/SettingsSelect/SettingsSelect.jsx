import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import { deleteTodo, editTodo } from "../../redux/slices/todosSlice";
import { getUrl, updateTodo } from "../../helpers";
import { Dropdown } from "../Dropdown/Dropdown";
import { Modal } from "../Modal";
import { EditTodo } from "../EditTodo/EditTodo";
import "./SettingsSelect.scss";

const removeTodo = async (todoId) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos/${todoId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};

export const SettingsSelect = (props) => {
  const { todo } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState(props.todo.label);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEdit(true);
  };

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
    setIsLoading(true);
    try {
      const response = await removeTodo(props.todo.id);
      dispatch(deleteTodo({ todoIds: response }));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(true);
  };

  const options = [
    { label: "Edit", value: "edit" },
    { label: "Remove", value: "remove" },
  ];

  const onOptionClick = (value) => {
    switch (value) {
      case "edit":
        return handleEdit();
      case "remove":
        return handleRemove();
    }
  };

  const handleEditValue = (event) => {
    setEditValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await updateTodo(props.todo.id, { label: editValue });
      dispatch(editTodo(response));
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };
  //TODO przesun logike zwiazana z zawartoscia modala poza komponent settingsselect, do edittodo

  return (
    <>
      {isEdit ? (
        <Modal isModalOpen={isEdit}>
          <EditTodo
            handleSubmit={handleSubmit}
            editValue={editValue}
            handleEditValue={handleEditValue}
            isLoading={isLoading}
            onClose={setIsEdit}
          />
        </Modal>
      ) : null}
      <div
        id="settings__options"
        className="dropdown__icon"
        ref={ref}
        onClick={handleDropdownClick}
        open={isDropdownOpen}
      >
        <FiMoreVertical />

        {isDropdownOpen ? (
          <Dropdown
            isDropdownOpen={isDropdownOpen}
            options={options}
            handleClick={onOptionClick}
          />
        ) : null}
      </div>
    </>
  );
};