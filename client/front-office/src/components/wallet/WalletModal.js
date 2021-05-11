import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const WalletModal = ({
  wallet,
  setWalletHandler,
  setWalletsHandler,
  showModal,
  setShowModal,
  error,
}) => {
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
              autoComplete="off"
              onChange={setWalletHandler}
              value={wallet.name}
              className={error.name ? 'border border-danger ' : `mb-3`}
            />
            {error.name && <p className="text-danger align-self-center">{error.name}</p>}
            <input
              type="text"
              placeholder="balance..."
              name="balance"
              autoComplete="off"
              onChange={setWalletHandler}
              value={wallet.balance}
              className={error.balance ? 'border border-danger ' : `mb-3`}
            />
            {error.balance && <p className="text-danger align-self-center">{error.balance}</p>}
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
