import "./tag.scss";
export const Tag = (props) => {
  const { tags } = props;

  return (
    <ul className="tag__list">
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
};
