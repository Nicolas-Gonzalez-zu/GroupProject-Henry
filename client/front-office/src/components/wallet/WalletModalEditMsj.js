import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const WalletModaEditlMsj = ({ showModalEditMsj, setModalEditHandler, errorsEdit }) => (
  <div>
    <Modal show={showModalEditMsj}>
      <Modal.Header className={errorsEdit ? 'bg-danger' : 'bg-success'}>
        {errorsEdit ? <h3>Error!</h3> : ''}
      </Modal.Header>
      <Modal.Body className={errorsEdit ? 'bg-danger' : 'bg-success'}>
        {errorsEdit ? (
          <p>The wallet cant be edited, please try again!</p>
        ) : (
          <p>
            <b>Wallet Edited!</b>
          </p>
        )}
      </Modal.Body>
      <Modal.Footer className={errorsEdit ? 'bg-danger' : 'bg-success'}>
        <Button onClick={setModalEditHandler}>close</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default WalletModaEditlMsj;
