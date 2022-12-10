import { createPortal } from "react-dom";
import "./modal.scss";

export const Modal = (props) => {
  const modal = document.getElementById("modal");

  if (!props.isModalOpen) {
    return null;
  }

  return createPortal(
    <div className="modal__overlay">
      <div className="modal">{props.children}</div>
    </div>,
    modal
  );
};
