import "./Dropdown.scss";

export const Dropdown = (props) => {
  const { options, handleClick } = props;

  return (
    <ul className="dropdown__open">
      {options.map((option, index) => (
        <li
          key={index}
          className="dropdown__item"
          onClick={() => {
            handleClick(option.value);
          }}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};
