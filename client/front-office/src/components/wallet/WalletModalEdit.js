import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as action from '../../actions/creators';
import WalletModaEditlMsj from './WalletModalEditMsj';

const WalletModalEdit = ({ id }) => {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [newWallet, setNewWallet] = useState({
    name: '',
    balance: null,
  });
  const [errorEdit, setErrorEdit] = useState({});
  const [errorsEdit, setErrorsEdit] = useState(false);
  const [showModalEditMsj, setShowModalMsjEdit] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!newWallet.name.length) {
      setErrorEdit({ ...errorEdit, name: 'the name is required!' });
    } else if (!/^[a-z][a-z\s]*$/g.test(newWallet.name)) {
      setErrorEdit({ ...errorEdit, name: 'this field only accepts letters!' });
    } else if (!newWallet.balance) {
      setErrorEdit({ ...errorEdit, balance: 'the balance is required!' });
    } else if (!/^[0-9]*$/gm.test(newWallet.balance)) {
      setErrorEdit({ ...errorEdit, balance: 'this field only accepts numbers!' });
    }
  }, [newWallet]);

  const showModalHandler = () => {
    setShowModalEdit(!showModalEdit);
    console.log(id);
  };
  const setNewWalletHandler = (e) => {
    setNewWallet({ ...newWallet, [e.target.name]: e.target.value });
    setErrorEdit({ ...errorEdit, [e.target.name]: '' });
  };
  const setModalEditHandler = () => {
    if (errorEdit.name.length > 0 || errorEdit.balance.length > 0) {
      setShowModalMsjEdit(!showModalEditMsj);
    } else {
      setShowModalMsjEdit(!showModalEditMsj);
      setShowModalEdit(!showModalEdit);
    }
  };

  const submitEditWallet = (e) => {
    if (errorEdit.name.length > 0 || errorEdit.balance.length > 0) {
      setErrorsEdit(true);
      return setModalEditHandler();
    }
    setErrorsEdit(false);
    const walletEdited = { ...newWallet, id };
    action.editWallet(walletEdited, dispatch);
    setNewWallet({ name: '', balance: null });
    return setModalEditHandler();
  };

  return (
    <div>
      {showModalEditMsj ? (
        <WalletModaEditlMsj
          showModalEditMsj={showModalEditMsj}
          setModalEditHandler={setModalEditHandler}
          errorsEdit={errorsEdit}
        />
      ) : (
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
                  autoComplete="off"
                  onChange={setNewWalletHandler}
                  value={newWallet.name}
                  className={errorEdit.name ? 'border border-danger' : 'mb-3'}
                />
                {errorEdit.name ? (
                  <p className="text-danger align-self-center">{errorEdit.name}</p>
                ) : (
                  ''
                )}
                <input
                  type="text"
                  placeholder="balance..."
                  name="balance"
                  onChange={setNewWalletHandler}
                  autoComplete="off"
                  value={newWallet.balance}
                  className={errorEdit.balance ? 'border border-danger' : 'mb-3'}
                />
                {errorEdit.balance ? (
                  <p className="text-danger align-self-center">{errorEdit.balance}</p>
                ) : (
                  ''
                )}
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
      )}
    </div>
  );
};

export default WalletModalEdit;
