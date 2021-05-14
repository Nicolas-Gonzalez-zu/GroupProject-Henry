import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import IncomeTable from './IncomeTable';
import IncomeModalMsj from './IncomeModalMsj';
import * as action from '../../../actions/creators';

const Income = () => {
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const incomes = useSelector((state) => state.movementReducer.movements);
  const authAlert = useSelector((store) => store.authReducers.authAlert);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   action.getWallet(dispatch);
  //   action.getMovements(dispatch);
  // }, [dispatch]);

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

  const incomesFiltered = incomes.filter((i) => i.type === 'INCOME');
  console.log(incomesFiltered);
  // const [showIncomeMsj, setShowIncomeMsj] = useState(false);
  console.log(incomes);
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

  const formik = useFormik({
    initialValues: {
      amount: null,
      type: 'INCOME',
      generation_date: '',
      description: '',
      wallet_id: '',
      // budget_id: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      const newValues = { ...values, amount: parseInt(values.amount, 10) };
      console.log(newValues, 'soy new values');
      action.addIncome(newValues, dispatch);
    },
  });
  return (
    <div className="d-flex flex-column m-3">
      <div className="card card-success align-self-center" style={{ width: '40%' }}>
        <div className="card-header">
          <h3 className="card-title">Add your income</h3>
        </div>

        <form className="form-horizontal" onSubmit={formik.handleSubmit}>
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="inputEmail3" className="col-3 col-form-label">
                Amount
              </label>
              <div className="col-5">
                <input
                  type="text"
                  // className={error.amount ? 'form-control is-invalid' : 'form-control'}
                  name="amount"
                  value={formik.values.amount}
                  autoComplete="off"
                  onChange={formik.handleChange}
                  placeholder="Amount..."
                  className={formik.errors.amount ? 'form-control is-invalid' : 'form-control'}
                />
                {formik.errors.amount ? (
                  <p className="text-danger">
                    <b>{formik.errors.amount}</b>
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-3 col-form-label">
                Generation Date
              </label>
              <div className="col-5">
                <input
                  type="datetime-local"
                  className={
                    formik.errors.generation_date ? 'form-control is-invalid' : 'form-control'
                  }
                  placeholder=".col-3"
                  name="generation_date"
                  value={formik.values.generation_date}
                  onChange={formik.handleChange}
                />
                {formik.errors.generation_date ? (
                  <p className="text-danger">
                    <b>{formik.errors.generation_date}</b>
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-3 col-form-label">
                To
              </label>
              <div className="col-5">
                <select
                  className="custom-select"
                  name="wallet_id"
                  onChange={formik.handleChange}
                  value={formik.values.wallet_id}
                  className={formik.errors.wallet_id ? 'form-control is-invalid' : 'form-control'}
                >
                  <option selected>-</option>
                  {wallets && wallets.map((w) => <option value={w.id}>{w.name}</option>)}
                </select>
                {formik.errors.wallet_id ? (
                  <p className="text-danger">
                    <b>{formik.errors.wallet_id}</b>
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-3 col-form-label">
                Description
              </label>
              <div className="col-5">
                <input
                  type="text"
                  className={formik.errors.description ? 'form-control is-invalid' : 'form-control'}
                  placeholder="description..."
                  name="description"
                  value={formik.values.description}
                  autoComplete="off"
                  onChange={formik.handleChange}
                />
                {formik.errors.description ? (
                  <p className="text-danger">
                    <b>{formik.errors.description}</b>
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-success">
              Add income
            </button>
          </div>
        </form>
      </div>
      <div className="">
        <IncomeTable movements={incomesFiltered} wallets={wallets} />
      </div>
    </div>
  );
};
export default Income;
