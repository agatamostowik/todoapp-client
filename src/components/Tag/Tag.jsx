import { FiX } from "react-icons/fi";
import "./tag.scss";

export const Tag = (props) => {
  const { tags, handleRemove, isRemovable } = props;

  return (
    <ul className="tag__list">
      {tags.map((tag, index) => (
        <li key={index} className="tag__container">
          <div className="tag__label">{tag.name}</div>
          {isRemovable ? (
            <div
              className="tag__remove"
              onClick={() => {
                handleRemove(tag);
              }}
            >
              <FiX />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};
