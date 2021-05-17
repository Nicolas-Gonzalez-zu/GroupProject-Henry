import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NoAddWalletModal = ({ showModal, setModalHandler }) => (
  <div>
    <Modal show={showModal}>
      <Modal.Header className="d-flex flex-column">
        <Button onClick={setModalHandler} className="btn btn-danger align-self-end">
          X
        </Button>
        <h3 className="align-self-center">Sorry!</h3>
      </Modal.Header>
      <Modal.Body className="text text-danger">
        <h5>It seems that you exceed the quantity of wallets available...</h5>
        <h5>
          <b>Please disable almost one of them and try again!</b>
        </h5>
      </Modal.Body>
    </Modal>
  </div>
);

export default NoAddWalletModal;
