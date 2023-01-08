import { Loader } from "../Loader";
import "./Button.scss";

export const Button = (props) => {
  const { type, onClick, isDisabled, isLoading, children } = props;

  return (
    <button
      id="btn"
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? <Loader size={"20"} /> : children}
    </button>
  );
};
