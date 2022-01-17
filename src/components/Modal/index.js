import React from 'react';
import {
  Button, Modal, ModalBody, ModalHeader, ModalFooter,
} from 'reactstrap';

const CustomModal = ({
  open, descricao, adicional, nao, sim,
}) => (
  <Modal className="modal-container shadow" isOpen={open}>
    <ModalHeader className="m-0 pt-1" />
    <ModalBody className="modal-body m-0 p-4">
      <h5 className="p-0 m-0 text-dark">{ descricao }</h5>
      <h6 className="p-0 m-0 text-dark pt-3">{ adicional }</h6>
    </ModalBody>
    <ModalFooter className="modal-footer p-2">
      <Button color="danger" className="pr-2 pl-2" onClick={nao}>Não</Button>
      <Button color="primary" className="pr-2 pl-2" onClick={sim}>Sim</Button>
    </ModalFooter>
  </Modal>
);

export default CustomModal;
