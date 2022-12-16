import { Dropdown } from "../Dropdown/Dropdown";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { getUrl } from "../../helpers";
import { Tag } from "../Tag/Tag.jsx";

import "./ModalMultiselect.scss";
import { setTags } from "../../redux/slices/tagsSlice";
import { Input } from "../Input";
import { AddNew } from "../AddNew/AddNew";

const fetchTags = async () => {
  const url = getUrl();
  const response = await fetch(`${url}/api/tags`, {
    method: "GET",
    credentials: "include",
  });

  return response.json();
};

export const ModalMultiselect = (props) => {
  const { value, onChange } = props;

  const [isModalStatusDropdownOpen, setIsModalStatusDropdownOpen] =
    useState(false);
  const [newTag, setNewTag] = useState("");

  const ref = useRef();

  const dispatch = useDispatch();

  const tags = useSelector((state) => {
    return state.tags.data;
  });

  const offClick = (event) => {
    if (!ref.current.contains(event.target)) {
      setIsModalStatusDropdownOpen(false);
    }
  };

  const handleOpen = (event) => {
    setIsModalStatusDropdownOpen(!isModalStatusDropdownOpen);
    event.stopPropagation();
  };

  const handleSelect = (tagId) => {
    const option = tags.find((tag) => tag.id === tagId);

    onChange([...value, option]);
  };

  const handleRemove = (tag) => {
    onChange((currentTags) =>
      currentTags.filter((currentTag) => {
        return currentTag.name !== tag.name;
      })
    );
  };

  const handleNewTag = (event) => {
    setNewTag(event.target.value);
  };

  const handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();
    onChange([...value, { name: newTag, id: "new_tag" }]);
  };

  useEffect(() => {
    window.addEventListener("click", offClick);

    return () => {
      window.removeEventListener("click", offClick);
    };
  });

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

  const filteredOptions = tags.filter((tag) => {
    return !value.some((copyTag) => copyTag.id === tag.id);
  });

  const options = filteredOptions.map(({ name, id }) => ({
    ["label"]: name,
    ["value"]: id,
  }));

  const isAddButtonDisabled = value.some((v) => v.name === newTag);

  return (
    <div id="modal-multiselect" ref={ref}>
      <h4 className="modal-multiselect__title">Tags</h4>
      <div className="modal-multiselect__tags-container">
        <Tag tags={value} isRemovable={true} handleRemove={handleRemove} />
      </div>
      <div className="select__wrapper" onClick={handleOpen}>
        <label className="label" htmlFor="select-tag">
          Select an existing tag
        </label>
        <div id="select-tag" className="todo-container">
          Select a tag...
          <div className="select__chevron">
            {isModalStatusDropdownOpen ? (
              <FiChevronUp size="16" />
            ) : (
              <FiChevronDown size="16" />
            )}
          </div>
        </div>

        {isModalStatusDropdownOpen ? (
          <Dropdown options={options} handleClick={handleSelect} />
        ) : null}
      </div>

      <AddNew
        label="Add a new tag"
        onSubmit={handleSubmit}
        value={newTag}
        onChange={handleNewTag}
        isAddButtonDisabled={isAddButtonDisabled}
        isLoading={false}
      />
    </div>
  );
};
