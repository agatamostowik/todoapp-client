import "./Dropdown.scss";

export const Dropdown = (props) => {
  const { isStatusDropdownOpen, options, handleClick } = props;

  return (
    <ul className={`dropdown${isStatusDropdownOpen ? "-open" : ""}`}>
      {options.map((option, index) => (
        <li
          key={index}
          onClick={() => {
            handleClick(option.value);
          }}
          className="dropdown-item"
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};
