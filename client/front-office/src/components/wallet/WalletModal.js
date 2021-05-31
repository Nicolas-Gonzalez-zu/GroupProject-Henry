import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import FormDefault from '../FormDefault/FormDefault';
import * as action from '../../actions/creators';

const WalletModal = () => {
  const [showModal, setShowModal] = useState(false);
  const authAlert = useSelector((state) => state.authReducers.authAlert);
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);
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
    // action.getWallet(dispatch);
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'The name is required!';
    } else if (!/^[a-zA-Z\s]+$/g.test(values.name)) {
      errors.name = 'This field only accept letters!';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: (values) => {
      const newWallet = { ...values, balance: 0 };
      action.addWallet(newWallet, dispatch);
      setTimeout(() => {
        setModalHandler();
        formik.resetForm({ name: '', balance: '' });
      }, 1500);
    },
  });

  const walletsAvailable = wallets.filter((w) => w.status);
  const setCantWallet = () => {
    if (!user) {
      return '';
    }
    const cantWallets = user.plan.name === 'Free' ? 5 : 10;
    return cantWallets;
  };
  return (
    <div>
      {walletsAvailable.length < setCantWallet() ? (
        <Button onClick={setModalHandler} className="btn-warning">
          Add Wallet
        </Button>
      ) : (
        <Button className="btn-warning" disabled>
          You cant add a new wallet
        </Button>
      )}
      <Modal show={showModal}>
        <Modal.Header className="d-flex flex-column ">
          <h3>
            Create your new <b className="text-olive">Wallet</b>
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={formik.handleSubmit}
          >
            <FormDefault
              values={formik.values}
              errors={formik.errors}
              handleChange={formik.handleChange}
              inputType={['text', 'text']}
            />
            <div className="d-flex justify-content-center">
              <Button type="submit" className="btn btn-success">
                Add wallet
              </Button>
              <Button className="btn btn-danger ml-3" onClick={setModalHandler}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default WalletModal;
