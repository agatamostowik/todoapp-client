import "./Dropdown.scss";

export const Dropdown = (props) => {
  const { options, onSelect } = props;

  return (
    <ul id="dropdown">
      {options.map((option, index) => (
        <li
          key={index}
          className="dropdown__item"
          onClick={() => {
            onSelect(option.value);
          }}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};
