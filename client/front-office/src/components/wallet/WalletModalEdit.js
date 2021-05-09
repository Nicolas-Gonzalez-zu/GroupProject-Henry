import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

const WalletModalEdit = ({ id }) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [newWallet, setNewWallet] = useState({
    name: '',
    balance: null,
  });
  const dispatch = useDispatch();
  const showModalHandler = () => {
    setShowModalEdit(!showModalEdit);
    console.log(id);
  };
  const setNewWalletHandler = (e) => {
    setNewWallet({ ...newWallet, [e.target.name]: e.target.value });
  };
  const submitEditWallet = () => {
    if (!newWallet.name || !newWallet.balance) {
      return alert('You need to fill both inputs');
    }
    if (typeof newWallet.name === 'number' || /[a-zA-Z]+/g.test(newWallet.balance)) {
      console.log(typeof newWallet.name, typeof newWallet.balance);
      return alert("Please set the values corretly, f.e: name:'cash', balance: 1300");
    }
    const walletEdited = { ...newWallet, id };
    action.editWallet(walletEdited, dispatch);
    setShowModalEdit(!showModalEdit);
    setNewWallet({
      name: '',
      balance: null,
    });
    return alert('wallet changed!');
  };

  return (
    <div>
      <Button onClick={showModalHandler} className="btn btn-info">
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={showModalEdit}>
        <Modal.Header>Edit your wallet please {id}</Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <input
              type="text"
              placeholder="cash..."
              name="name"
              onChange={setNewWalletHandler}
              value={newWallet.name}
            />
            <input
              type="text"
              placeholder="balance..."
              name="balance"
              onChange={setNewWalletHandler}
              value={newWallet.balance}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-success" onClick={submitEditWallet}>
            Edit wallet
          </Button>
          <Button onClick={showModalHandler}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WalletModalEdit;
