import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

export default function MovementsModal() {
  const [modal, setModal] = useState(false);
  const [stateValidate, setStateValidate] = useState(false);

  const budgets = useSelector((state) => state.budgetReducer.budgets);
  const dispatch = useDispatch();

  useEffect(() => {
    action.getBudget(dispatch);
  }, [dispatch]);

  const wallets = useSelector((state) => state.walletReducer.wallets);
  useEffect(() => {
    action.getWallet(dispatch);
  }, [dispatch]);

  // console.log(budgets, 'bud');
  const validate = (values) => {
    const errors = {};

    if (!values.amount) {
      errors.amount = 'Required';
    } else if (isNaN(values.amount)) {
      errors.amount = 'Amount Must be a Number';
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
      setStateValidate(true);
      setTimeout(() => setStateValidate(false), 1000);
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

  return (
    <div>
      <div>
        <Button onClick={showModal} className="btn btn-success">
          Create
        </Button>
        <Modal show={modal}>
          <Modal.Header>Create a New Movement</Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <label>Amount</label>
              <input
                autoComplete="off"
                className={
                  formik.errors.amount ? 'form-control is-invalid col-4' : 'form-control col-4'
                }
                name="amount"
                id="amount"
                onChange={formik.handleChange}
                value={formik.values.amount}
              />
              {formik.errors.amount ? <b className="text-danger">{formik.errors.amount}</b> : null}
              <br />
              <label>Description</label>
              <input
                autoComplete="off"
                className={
                  formik.errors.description ? 'form-control is-invalid col-7' : 'form-control col-7'
                }
                name="description"
                id="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.errors.description ? (
                <b className="text-danger">{formik.errors.description}</b>
              ) : null}
              <label>Date</label>
              <input
                className={
                  formik.errors.generation_date
                    ? 'form-control is-invalid col-7'
                    : 'form-control col-7'
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
              <label>Wallets</label>

              <select
                name="wallet_id"
                value={formik.values.wallet_id}
                className={
                  formik.errors.wallet_id ? 'form-control is-invalid col-4' : 'form-control col-4'
                }
                id="wallet_id"
                onChange={formik.handleChange}
              >
                {filterwallets && filterwallets.map((b) => <option value={b.id}>{b.name}</option>)}
              </select>
              {formik.errors.wallet_id ? (
                <b className="text-danger">{formik.errors.wallet_id}</b>
              ) : null}
              <label>Budgets</label>

              <select
                name="budget_id"
                value={formik.values.budget_id}
                className={
                  formik.errors.budget_id ? 'form-control is-invalid col-4' : 'form-control col-4'
                }
                id="budget_id"
                onChange={formik.handleChange}
              >
                {filterbudgets && filterbudgets.map((b) => <option value={b.id}>{b.name}</option>)}
              </select>
              {formik.errors.budget_id ? (
                <b className="text-danger">{formik.errors.budget_id}</b>
              ) : null}
              <Button type="submit" className="btn btn-success">
                Create
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={showModal} className="btn btn-danger">
              Cancel
            </Button>
          </Modal.Footer>
          <Alert show={stateValidate} variant="success" className="text-center m-2">
            Movements Created Success
          </Alert>
        </Modal>
      </div>
    </div>
  );
}
