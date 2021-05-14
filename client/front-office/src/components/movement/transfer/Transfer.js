import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as action from '../../../actions/creators';

export default function Transfer() {
  const transfer = useSelector((state) => state.transferReducer.transfers);
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();
  console.log(transfer, 'hola');
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

      action.getWallet(dispatch);
    }
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  useEffect(() => {
    action.getTransfer(dispatch);
  }, [dispatch]);
  const validate = (values) => {
    const errors = {};

    if (!values.amount) {
      errors.amount = 'Required';
    } else if (isNaN(values.amount)) {
      errors.amount = 'Amount Must be a Number';
    }

    if (!values.generation_date) {
      errors.generation_date = 'Date Required';
    }
    if (!values.origin_wallet_id) {
      errors.origin_wallet_id = 'Origin wallet is Required';
    }
    if (!values.destination_wallet_id) {
      errors.destination_wallet_id = 'Destination wallet is Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      amount: '',
      generation_date: '',
      origin_wallet_id: '',
      destination_wallet_id: '',
    },
    validate,
    onSubmit: (values) => {
      const newValues = { ...values, amount: Number(values.amount, 10) };
      action.addTransfer(newValues, dispatch);
      formik.resetForm({
        amount: '',
        generation_date: '',
        origin_wallet_id: '',
        destination_wallet_id: '',
      });
    },
  });

  const filterwallets = wallets.filter((x) => x.status === true);
  return (
    <>
      <div className="card-header bg-warning">
        <h3 className=" p-2">~ Transfer money between wallets</h3>
      </div>
      <div className="card-body">
        <form onSubmit={formik.handleSubmit}>
          <div className="row ">
            <h3 className=" mr-1"> From </h3>
            <div className="col-2">
              <select
                name="origin_wallet_id"
                value={formik.values.origin_wallet_id}
                className={
                  formik.errors.origin_wallet_id
                    ? 'form-control is-invalid col-12'
                    : 'form-control col-12'
                }
                id="origin_wallet_id"
                onChange={formik.handleChange}
              >
                <option value="none">Choose One</option>
                {filterwallets &&
                  filterwallets.map((b) => (
                    <option value={b.id}>{`${b.name} ~ $${b.balance}.00`}</option>
                  ))}
              </select>
            </div>
            <h3 className="mr-1">$ </h3>
            <div className="col-2 d-row ml-1 mr-2">
              <div className="d-flex">
                <input
                  autoComplete="off"
                  className={
                    formik.errors.amount ? 'form-control is-invalid col-12' : 'form-control col-12'
                  }
                  name="amount"
                  id="amount"
                  placeholder="Amount..."
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                />
              </div>
              <div className="d-row">
                {formik.errors.amount ? (
                  <b className="text-danger">{formik.errors.amount}</b>
                ) : null}
              </div>
            </div>
            <h3 className=" mr-1 ml-2"> To </h3>
            <div className="col-2">
              <select
                name="destination_wallet_id"
                value={formik.values.destination_wallet_id}
                className={
                  formik.errors.destination_wallet_id
                    ? 'form-control is-invalid col-12'
                    : 'form-control col-12'
                }
                id="destination_wallet_id"
                onChange={formik.handleChange}
              >
                <option value="none">Choose One</option>
                {filterwallets &&
                  filterwallets.map((b) => (
                    <option value={b.id}>{`${b.name} ~ $${b.balance}.00`}</option>
                  ))}
              </select>
            </div>

            <h3 className="mr-1"> Date </h3>
            <div className="col-2 d-row ml-1 mr-2">
              <div className="d-flex">
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
              </div>
              {formik.errors.generation_date ? (
                <b className="text-danger">{formik.errors.generation_date}</b>
              ) : null}{' '}
            </div>

            <button className="btn btn-success col-2 ml-3" type="submit">
              Transfer
            </button>
          </div>
        </form>
      </div>

      <div className="card-body">
        <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
          <div className="row">
            <div className="col-sm-12 col-md-6" />
            <div className="col-sm-12 col-md-6" />
          </div>

          <div className="row">
            <div className="col-sm-12">
              <table
                id="example2"
                className="table table-bordered table-hover dataTable dtr-inline"
                role="grid"
                aria-describedby="example2_info"
              >
                <thead>
                  <tr role="row">
                    <th
                      className="sorting"
                      aria-controls="example2"
                      aria-label="Rendering engine: activate to sort column ascending"
                    >
                      <b>ID</b>
                    </th>
                    <th
                      className="sorting sorting_desc"
                      aria-controls="example2"
                      aria-label="Browser: activate to sort column ascending"
                      aria-sort="descending"
                    >
                      Amount
                    </th>
                    <th
                      className="sorting sorting_desc"
                      aria-controls="example2"
                      aria-label="Browser: activate to sort column ascending"
                      aria-sort="descending"
                    >
                      Origin wallet
                    </th>
                    <th
                      className="sorting"
                      aria-controls="example2"
                      aria-label="Platform(s): activate to sort column ascending"
                    >
                      Destination Wallet
                    </th>
                    <th
                      className="sorting"
                      aria-controls="example2"
                      aria-label="Engine version: activate to sort column ascending"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                {transfer &&
                  transfer.slice(0, 7).map((x) => (
                    <>
                      <tbody>
                        <tr className="odd">
                          <td className="dtr-control">{x.id}</td>
                          <td className="sorting_1 text-info">$ {x.amount}</td>
                          <td> {x.origin_wallet.name}</td>
                          <td> {x.destination_wallet.name}</td>
                          <td> {x.generation_date.replace('T', ' ~ ').replace('.000Z', ' ')}</td>
                        </tr>
                      </tbody>
                    </>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
