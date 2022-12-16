import "./styles.scss";

export const Input = (props) => {
  const { id, label, value, onChange, autoComplete, type, autofocus } = props;

  return (
    <div id="input-component">
      {label ? (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className="todo-container"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        autoFocus={autofocus}
      />
    </div>
  );
};
