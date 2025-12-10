import React from "react";
import "../../css/Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e) =>
          e.stopPropagation()
        } /* prevent backdrop close when clicking modal */
        style={{ position: "relative" }}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
