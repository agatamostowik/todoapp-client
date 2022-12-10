import "./Dropdown.scss";

export const Dropdown = (props) => {
  const { isStatusDropdownOpen, options, handleClick } = props;

  return (
    <ul className="dropdown__open">
      {options.map((option, index) => (
        <li
          key={index}
          onClick={() => {
            handleClick(option.value);
          }}
          className="dropdown__item"
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};
