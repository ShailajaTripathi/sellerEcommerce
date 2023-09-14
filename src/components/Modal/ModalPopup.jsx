import React from "react";
import { Modal } from "react-bootstrap";

const ModalPopup = (props) => {
  const { show, children, handleClose, modalTitle,cname } = props;
  return (
    <Modal onClose={handleClose} show={show} onHide={handleClose} className={cname}>
      <Modal.Header closeButton>
        {modalTitle && <Modal.Title>{modalTitle}</Modal.Title>}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalPopup;