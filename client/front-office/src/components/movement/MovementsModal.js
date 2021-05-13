import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import './modalcss.css';
import * as action from '../../actions/creators';

export default function MovementsModal() {
  const [modal, setModal] = useState(false);
  const budgets = useSelector((state) => state.budgetReducer.budgets);
  const dispatch = useDispatch();
  const authAlert = useSelector((store) => store.authReducers.authAlert);

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
    action.getBudget(dispatch);
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  const wallets = useSelector((state) => state.walletReducer.wallets);
  useEffect(() => {
    action.getWallet(dispatch);
  }, [dispatch]);

  const validate = (values) => {
    const errors = {};

    if (!values.amount) {
      errors.amount = 'Required';
    } else if (isNaN(values.amount)) {
      errors.amount = 'Amount Must be a Number';
    } else if (values.amount > wallets.balance) {
      errors.amount = 'Amount Cant be ';
    }
    if (!values.description) {
      errors.description = 'Description Required';
    } else if (values.description.length < 2) {
      errors.description = 'Description Required Must have at least 3 letters';
    }

    if (!values.generation_date) {
      errors.generation_date = 'Date Required';
    }
    if (!values.wallet_id) {
      errors.wallet_id = 'Wallet is Required';
    }
    if (!values.budget_id) {
      errors.budget_id = 'Budget is Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amount: null,
      type: 'OUTGO',
      generation_date: '',
      description: '',
      wallet_id: '',
      budget_id: '',
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => setModal(false), 1500);

      action.addMovement(values, dispatch);

      // alert(JSON.stringify(values, null, 2));
    },
  });

  const showModal = () => {
    setModal(!modal);
  };

  const filterbudgets = budgets.filter((x) => x.status === true);
  const filterwallets = wallets.filter((x) => x.status === true);
  console.log(filterbudgets, 'bud');
  return (
    <>
      <Button onClick={showModal} className="btn btn-success col-2 mr-2 ">
        Create
      </Button>
      <Modal show={modal} dialogClassName="modal-90w">
        <Modal.Header>
          <h3>Create a New Movement</h3>
          <Button onClick={showModal} className="btn btn-danger">
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex">
              <div className="pr-3">
                <b>Amount</b>
                <input
                  autoComplete="off"
                  className={
                    formik.errors.amount ? 'form-control is-invalid col-12' : 'form-control col-12'
                  }
                  name="amount"
                  id="amount"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                />
                {formik.errors.amount ? (
                  <b className="text-danger">{formik.errors.amount}</b>
                ) : null}
                <br />
                <b>Description</b>
                <input
                  autoComplete="off"
                  className={
                    formik.errors.description
                      ? 'form-control is-invalid col-12'
                      : 'form-control col-12'
                  }
                  name="description"
                  id="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
                {formik.errors.description ? (
                  <b className="text-danger">{formik.errors.description}</b>
                ) : null}
                <br />
                <b>Date</b>
                <input
                  className={
                    formik.errors.generation_date
                      ? 'form-control is-invalid col-12'
                      : 'form-control col-12'
                  }
                  type="datetime-local"
                  name="generation_date"
                  id="generation_date"
                  onChange={formik.handleChange}
                  value={formik.values.generation_date}
                />
                {formik.errors.generation_date ? (
                  <b className="text-danger">{formik.errors.generation_date}</b>
                ) : null}
              </div>

              <div>
                <b>Wallets</b>
                <select
                  name="wallet_id"
                  value={formik.values.wallet_id}
                  className={
                    formik.errors.wallet_id
                      ? 'form-control is-invalid col-12'
                      : 'form-control col-12'
                  }
                  id="wallet_id"
                  onChange={formik.handleChange}
                >
                  <option value="none">Choose One</option>
                  {filterwallets &&
                    filterwallets.map((b) => (
                      <option value={b.id}>{`${b.name} ~ $${b.balance}.00`}</option>
                    ))}
                </select>
                {formik.errors.wallet_id ? (
                  <b className="text-danger">{formik.errors.wallet_id}</b>
                ) : null}
                <br />
                <b className="text-center">Budgets</b>
                <select
                  name="budget_id"
                  value={formik.values.budget_id}
                  className={
                    formik.errors.budget_id
                      ? 'form-control is-invalid col-12'
                      : 'form-control col-12'
                  }
                  id="budget_id"
                  onChange={formik.handleChange}
                >
                  <option value="none">Choose One</option>
                  {filterbudgets &&
                    filterbudgets.map((b) => (
                      <option value={b.id}>{`${b.name} ~ $${b.amount}`}</option>
                    ))}
                </select>
                {formik.errors.budget_id ? (
                  <b className="text-danger">{formik.errors.budget_id}</b>
                ) : null}

                <Button type="submit" className="btn btn-success mt-5 ml-5 col-9">
                  Create
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
