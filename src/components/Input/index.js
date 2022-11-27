import "./styles.scss";

export const Input = (props) => {
  const { id, label, value, onChange, autoComplete, type } = props;

  return (
    <div className="input_component">
      <label className="label" htmlFor={id}>
        {label}:
      </label>
      <input
        id={id}
        className="input"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        type={type}
      />
    </div>
  );
};
