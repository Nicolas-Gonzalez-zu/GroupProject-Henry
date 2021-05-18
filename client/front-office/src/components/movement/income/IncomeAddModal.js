import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import * as action from '../../../actions/creators';

const IncomeAddModal = ({ showModal, showModalHandler }) => {
  const wallets = useSelector((state) => state.walletReducer.wallets);
  // const incomes = useSelector((state) => state.movementReducer.movements);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();

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
    action.getMovements(dispatch);
    action.getWallet(dispatch);
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  const validate = (values) => {
    const errors = {};
    if (!/^[0-9]*$/gm.test(values.amount)) {
      errors.amount = 'The amount must be a number';
    } else if (!values.amount) {
      errors.amount = 'the amount is required';
    }
    if (values.wallet_id === '-') {
      errors.wallet_id = 'the wallet is required';
    }
    if (!values.generation_date) {
      errors.generation_date = 'the generation date is required';
    }
    if (!values.description) {
      errors.description = 'the description is required';
    } else if (values.description.length < 5) {
      errors.description = 'the description must contain at least 5 letters';
    }
    return errors;
  };

  const walletsAvailable = wallets.filter((w) => w.status);

  const formik = useFormik({
    initialValues: {
      amount: '',
      type: 'INCOME',
      generation_date: '',
      description: '',
      wallet_id: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      const newValues = { ...values, amount: Number(values.amount, 10) };
      console.log(newValues, 'soy new values');
      action.addIncome(newValues, dispatch);
      setTimeout(() => {
        showModalHandler();
        formik.resetForm({
          amount: '',
          type: 'INCOME',
          generation_date: '',
          description: '',
          wallet_id: '',
        });
      }, 1500);
    },
  });
  return (
    <div className="d-flex">
      <Button className="btn btn-success mr-3" onClick={showModalHandler}>
        Add Income
      </Button>
      <Modal show={showModal}>
        <Modal.Header className="d-flex bg-info justify-content-between w-100 p-2 rounded-top">
          <div>
            <h4>Add your Income</h4>
          </div>
          {/* <div className="align-self-end"> */}
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="d-flex flex-column">
              <label className="align-self-center">Amount</label>
              <input
                type="text"
                name="amount"
                value={formik.values.amount}
                autoComplete="off"
                onChange={formik.handleChange}
                placeholder="Amount..."
                className={
                  formik.errors.amount
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              />
              {formik.errors.amount ? (
                <p className="text-danger align-self-center">
                  <b>{formik.errors.amount}</b>
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column">
              <label className="align-self-center">Generation Date</label>
              <input
                type="datetime-local"
                className={
                  formik.errors.generation_date
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
                name="generation_date"
                value={formik.values.generation_date}
                onChange={formik.handleChange}
              />
              {formik.errors.generation_date ? (
                <p className="text-danger align-self-center">
                  <b>{formik.errors.generation_date}</b>
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column">
              <label className="align-self-center">Wallet</label>
              <select
                name="wallet_id"
                onChange={formik.handleChange}
                value={formik.values.wallet_id}
                className={
                  formik.errors.wallet_id
                    ? ' "custom-select form-control is-invalid w-50 align-self-center'
                    : ' "custom-select form-control w-50 align-self-center'
                }
              >
                <option selected>-</option>
                {walletsAvailable &&
                  walletsAvailable.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
              {formik.errors.wallet_id ? (
                <p className="text-danger align-self-center">
                  <b>{formik.errors.wallet_id}</b>
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column">
              <label className="align-self-center">Description</label>
              <input
                type="text"
                className={
                  formik.errors.description
                    ? 'form-control is-invalid w-55 align-self-center'
                    : 'form-control w-55 align-self-center'
                }
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description ? (
                <p className="text-danger align-self-center">
                  <b>{formik.errors.description}</b>
                </p>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-success align-self-end">
                Add Income
              </button>
              <button
                type="button"
                className="btn btn-danger align-self-end ml-3"
                onClick={showModalHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default IncomeAddModal;
