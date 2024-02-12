import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = isOpen && (
    <div className={css.header}>
      <div className={css.main}>
        <button onClick={onClose}>&times;</button>
      </div>
      {children}
    </div>
  );

  return isBrowser
    ? ReactDOM.createPortal(modalContent, document.getElementById("react-root"))
    : null;
};

export default Modal;
