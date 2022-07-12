import { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function FormModal({ title, children, isOpen, toggleModal }) {

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" form="postForm" onClick={toggleModal} type="submit">
          Submit 
        </Button>
        <Button onClick={toggleModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}
