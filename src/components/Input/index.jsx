import "./styles.scss";

export const Input = (props) => {
  const {
    id,
    label,
    value,
    onChange,
    autoComplete,
    type,
    autofocus,
    isDisabled,
  } = props;

  return (
    <div id="input">
      {label ? (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        disabled={isDisabled}
        id={id}
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        autoFocus={autofocus}
      />
    </div>
  );
};
