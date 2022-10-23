import { useDispatch } from "react-redux";
import { toggleCheck } from "../redux/slices/checkboxSlice";
import { FiCheck } from "react-icons/fi";

export const Checkbox = (props) => {
  const { todo, isChecked } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleCheck({ id: todo.id }));
  };

  return (
    <div className="checkbox-container">
      <div className="checkbox" onClick={handleClick}>
        <input type="checkbox" checked={isChecked} readOnly />
        <div>{isChecked ? <FiCheck /> : null} </div>
      </div>
    </div>
  );
};
