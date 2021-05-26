import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import * as action from '../../actions/creators';

export default function ExpenseModal() {
  const [modal, setModal] = useState(false);
  const budgets = useSelector((state) => state.budgetReducer.budgets);
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();

  const [alerto, setalerto] = useState('');

  useEffect(() => {
    if (authAlert.fire) {
      Swal.fire({
        title: authAlert.message,
        icon: authAlert.type,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        action.setAlert(dispatch);
      });
    }
    action.getBudget(dispatch);
    action.getWallet(dispatch);
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  const validate = (values) => {
    const errors = {};
    const sugg = filterbudgets.filter((f) => f.id == values.budget_id);
    if (!values.amount) {
      errors.amount = 'Required';
    } else if (isNaN(values.amount)) {
      errors.amount = 'Amount Must be a Number';
    } else if (values.amount > wallets.balance) {
      errors.amount = 'Amount Cant be ';
    }
    if (Number(sugg[0]?.amount) < values.amount) {
      setalerto('Your Amount is higher than your budget');
    } else {
      setalerto('');
    }
    console.log(values.generation_time);
    if (!values.description) {
      errors.description = 'Description Required';
    } else if (values.description.length < 2) {
      errors.description = 'Description Required Must have at least 3 letters';
    }

    if (!values.generation_date) {
      errors.generation_date = 'Date Required ';
    }
    if (!values.generation_time) {
      errors.generation_time = 'Time Required ';
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
      generation_time: '',
      description: '',
      wallet_id: '',
      budget_id: '',
    },
    validate,
    onSubmit: (values) => {
      setTimeout(() => setModal(false), 1400);
      const newValues = {
        ...values,
        generation_date: `${values.generation_date}T${values.generation_time}:00.000Z`,
      };
      console.log(newValues, 'new');
      action.addMovement(newValues, dispatch);
      setTimeout(
        () =>
          formik.resetForm({
            amount: null,
            type: 'OUTGO',
            generation_date: '',
            description: '',
            wallet_id: '',
            budget_id: '',
          }),
        1500,
      );
    },
  });

  const showModal = () => {
    setModal(!modal);
  };

  const filterbudgets = budgets.filter((x) => x.status === true);
  const filterwallets = wallets.filter((x) => x.status === true);

  return (
    <>
      <Button onClick={showModal} className="btn btn-warning col-2 mr-2 ">
        Create
      </Button>
      <Modal show={modal} dialogClassName="modal-90w">
        <Modal.Header>
          <h3>Create a New Movement</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex">
              <div className="pr-3 col-7">
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
                  type="date"
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
                      <option key={b.id} value={b.id}>{`${b.name} ~ $${b.balance}.00`}</option>
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
                      <option key={b.id} value={b.id}>{`${b.name} ~ $${b.amount}`}</option>
                    ))}
                </select>
                {formik.errors.budget_id ? (
                  <b className="text-danger">{formik.errors.budget_id}</b>
                ) : null}
                <br />
                <b className="text-center">Time</b>
                <input
                  type="time"
                  className={
                    formik.errors.generation_time
                      ? 'form-control is-invalid col-12'
                      : 'form-control col-12'
                  }
                  name="generation_time"
                  id="generation_time"
                  onChange={formik.handleChange}
                  value={formik.values.generation_time}
                />
                {formik.errors.generation_time ? (
                  <b className="text-danger">{formik.errors.generation_time}</b>
                ) : null}
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              <Button onClick={showModal} className="btn btn-danger mt-3 ml-2 mr-4">
                Cancel
              </Button>
              <Button type="submit" className="btn btn-success mt-3 ml-3">
                Create
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {alerto.length === 0 ? '' : <p className="text-warning">{alerto}!</p>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
