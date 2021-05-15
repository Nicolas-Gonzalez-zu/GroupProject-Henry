import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as action from '../../actions/creators';

const WalletModal = () => {
  // const [wallet, setWallet] = useState({
  //   name: '',
  //   balance: null,
  // });
  const [showModal, setShowModal] = useState(false);
  const authAlert = useSelector((state) => state.authReducers.authAlert);
  const dispatch = useDispatch();
  const setModalHandler = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (authAlert.fire) {
      const position = authAlert.type === 'success' ? 'center' : 'top-end';

      Swal.fire({
        title: authAlert.message,
        icon: authAlert.type,
        toast: true,
        position,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        if (authAlert.type === 'success') {
          action.setAlert(dispatch);
        } else {
          action.setAlert(dispatch);
        }
      });
    }
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'The name is required!';
    } else if (!/^[a-zA-Z\s]+$/g.test(values.name)) {
      errors.name = 'This field only accept letters!';
    }
    if (!values.balance) {
      errors.balance = 'The balance is required!';
    } else if (!/^[0-9]*$/gm.test(values.balance)) {
      errors.balance = 'This field only accept numbers!';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      balance: '',
    },
    validate,
    onSubmit: (values) => {
      const newWallet = { ...values, balance: Number(values.balance, 10) };
      action.addWallet(newWallet, dispatch);
      setTimeout(() => {
        setModalHandler();
        formik.resetForm({ name: '', balance: '' });
      }, 1500);
    },
  });
  return (
    <div>
      <Button onClick={setModalHandler} className="btn-success">
        Add Wallet
      </Button>
      <Modal show={showModal}>
        <Modal.Header className="d-flex flex-column bg-info">
          <Button className="btn btn-danger align-self-end" onClick={setModalHandler}>
            X
          </Button>
          <h4>Complete the inputs please</h4>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="d-flex flex-column m-3">
              <label className="align-self-center">Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="cash..."
                autoComplete="off"
                className={
                  formik.errors.name
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              />
              {formik.errors.name ? (
                <p className="text text-danger align-self-center">{formik.errors.name}</p>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column m-3">
              <label className="align-self-center">Balance</label>
              <input
                type="text"
                name="balance"
                value={formik.values.balance}
                onChange={formik.handleChange}
                placeholder="300..."
                autoComplete="off"
                className={
                  formik.errors.balance
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              />
              {formik.errors.balance ? (
                <p className="text text-danger align-self-center">{formik.errors.balance}</p>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex justify-content-center">
              <Button type="submit" className="btn btn-success">
                Add wallet
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default WalletModal;
