import "./styles.scss";

export const Loader = (props) => {
  const { size } = props;

  return (
    <div
      id="loader"
      style={{ height: `${size}px`, width: `${size}px` }}
      className="loader__container"
    >
      <div className="loader__spinner" />
    </div>
  );
};
