import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WalletModal = ({ wallet, setWalletHandler, setWalletsHandler, showModal, setShowModal }) => {
  //   const [showModal, setShowModal] = useState(false);

  const setModalHandler = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };
  return (
    <div>
      <Button onClick={setModalHandler} className="btn-success">
        Add Wallet
      </Button>
      <Modal show={showModal}>
        <Modal.Header>Complete the inputs please</Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <input
              type="text"
              placeholder="cash..."
              name="name"
              onChange={setWalletHandler}
              value={wallet.name}
            />
            <input
              type="text"
              placeholder="balance..."
              name="balance"
              onChange={setWalletHandler}
              value={wallet.balance}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-success" onClick={(e) => setWalletsHandler(e)}>
            Add Wallet
          </Button>
          <Button onClick={setModalHandler}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default WalletModal;
