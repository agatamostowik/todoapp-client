import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import "./modal.scss";

export const Modal = (props) => {
  const { onClose } = props;

  const modal = document.getElementById("modal");

  const handleClose = () => {
    onClose(false);
  };

  if (!props.isModalOpen) {
    return null;
  }

  return createPortal(
    <div className="modal__overlay">
      <div className="modal__content">
        <div className="modal__exit" onClick={handleClose}>
          <FiX />
        </div>
        {props.children}
      </div>
    </div>,
    modal
  );
};
