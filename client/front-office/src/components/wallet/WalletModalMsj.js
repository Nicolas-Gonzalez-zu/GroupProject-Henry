import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const WalletModalMsj = ({ showModalMsj, setModalMsjHandler, errors }) => (
  <div>
    <Modal show={showModalMsj}>
      <Modal.Header className={errors ? 'bg-danger' : 'bg-success'}>
        {errors ? <h3>Error!</h3> : <h3>Success!</h3>}
      </Modal.Header>
      <Modal.Body className={errors ? 'bg-danger' : 'bg-success'}>
        {errors ? (
          <p>The wallet cant be created, please try again!</p>
        ) : (
          <h6>
            <b>Wallet Added!</b>
          </h6>
        )}
      </Modal.Body>
      <Modal.Footer className={errors ? 'bg-danger' : 'bg-success'}>
        <Button onClick={setModalMsjHandler}>close</Button>
      </Modal.Footer>
    </Modal>
  </div>
);

export default WalletModalMsj;
