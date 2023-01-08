import { Dropdown } from "../Dropdown/Dropdown";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { status, statusOptions } from "../../helpers";
import "./ModalStatusSelect.scss";

export const ModalStatusSelect = (props) => {
  const { value, onChange } = props;

  const [isModalStatusDropdownOpen, setIsModalStatusDropdownOpen] =
    useState(false);

  const ref = useRef();

  const offClick = (event) => {
    if (!ref.current.contains(event.target)) {
      setIsModalStatusDropdownOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", offClick);

    return () => {
      window.removeEventListener("click", offClick);
    };
  });

  const handleOpen = (event) => {
    setIsModalStatusDropdownOpen(!isModalStatusDropdownOpen);
    event.stopPropagation();
  };

  const handleSelect = (option) => {
    onChange(option);
  };

  return (
    <div id="modal-status-select" onClick={handleOpen} ref={ref}>
      <div className="select__wrapper">
        <label className="label" htmlFor="status-select">
          Select status
        </label>
        <div className="input" id="status-select">
          {status[value]}
        </div>
        <div className="select__chevron">
          {isModalStatusDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      {isModalStatusDropdownOpen ? (
        <Dropdown options={statusOptions} onSelect={handleSelect} />
      ) : null}
    </div>
  );
};
