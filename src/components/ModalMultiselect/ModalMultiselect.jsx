import { Dropdown } from "../Dropdown/Dropdown";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { getUrl } from "../../helpers";

import "../ModalStatusSelect/ModalStatusSelect.scss";
import { setTags } from "../../redux/slices/tagsSlice";

const fetchTags = async () => {
  const url = getUrl();
  const response = await fetch(`${url}/api/tags`, {
    method: "GET",
    credentials: "include",
  });

  return response.json();
};

export const ModalMultiselect = () => {
  const [isModalStatusDropdownOpen, setIsModalStatusDropdownOpen] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const ref = useRef();

  const dispatch = useDispatch();

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

  useEffect(() => {
    async function getTags() {
      try {
        const serverTags = await fetchTags();
        dispatch(setTags({ tags: serverTags }));
      } catch (error) {
        console.log(error);
      }
    }
    getTags();
  }, []);

  const tags = useSelector((state) => {
    return state.tags.data;
  });

  const options = tags.map(({ name }) => ({
    ["label"]: name,
    ["value"]: name,
  }));

  const isAnyOptionSelected = selectedOption !== null;

  const getValue = () => {
    if (isAnyOptionSelected) {
      const obj = options.find((o) => o.value === selectedOption);
      return obj.label;
    } else if (!selectedOption) {
      return "Select tags";
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
