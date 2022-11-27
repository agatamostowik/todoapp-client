import "./Button.scss";

export const Button = (props) => {
  console.log("props: ", props);
  return <button className="btn">{props.children}</button>;
};
