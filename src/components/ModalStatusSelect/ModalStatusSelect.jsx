import { Dropdown } from "../Dropdown/Dropdown";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import "./ModalStatusSelect.scss";

const options = [
  { label: "New", value: "new" },
  { label: "In progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

export const ModalStatusSelect = () => {
  const [isModalStatusDropdownOpen, setIsModalStatusDropdownOpen] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

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
    setSelectedOption(option);
  };

  const isAnyOptionSelected = selectedOption !== null;

  const getValue = () => {
    if (isAnyOptionSelected) {
      const obj = options.find((o) => o.value === selectedOption);
      return obj.label;
    } else if (!selectedOption) {
      return "Select status";
    }
  };
  const value = getValue();

  return (
    <div id="modal-status-select" onClick={handleOpen} ref={ref}>
      <div className="select__wrapper">
        <div className="todo-container">{value}</div>
        <div className="select__chevron">
          {isModalStatusDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      {isModalStatusDropdownOpen ? (
        <Dropdown options={options} handleClick={handleSelect} />
      ) : null}
    </div>
  );
};
