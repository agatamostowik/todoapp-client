import "./Button.scss";

export const Button = (props) => {
  return (
    <button className="btn" onClick={props.onClick}>
      {props.children}
    </button>
  );
};
