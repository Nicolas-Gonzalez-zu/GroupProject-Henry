import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const WalletModaEditlMsj = ({ showModalEditMsj, setModalEditHandler, errorsEdit }) => (
  <div>
    <Modal show={showModalEditMsj}>
      <Modal.Header className={errorsEdit ? 'bg-danger' : 'bg-success'}>
        {errorsEdit ? <h3>Error!</h3> : <h3>Success!</h3>}
      </Modal.Header>
      <Modal.Body className={errorsEdit ? 'bg-danger' : 'bg-success'}>
        {errorsEdit ? (
          <h6>The wallet cant be edited, please try again!</h6>
        ) : (
          <h6>
            <b>Wallet Edited!</b>
          </h6>
        )}
      </Modal.Body>
      <Modal.Footer className={errorsEdit ? 'bg-danger' : 'bg-success'}>
        <Button onClick={setModalEditHandler}>close</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default WalletModaEditlMsj;
