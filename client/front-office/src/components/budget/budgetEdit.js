import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as action from '../../actions/creators';

const BudgetsEdit = ({ nameBefore, amountBefore, id }) => {
  const [showModalEdit, setShowModalEdit] = useState(false);

  const dispatch = useDispatch();

  const showModalEditHandler = () => {
    setShowModalEdit(!showModalEdit);
    console.log(id);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'The name is required!';
    } else if (!/^[a-zA-Z\s]+$/g.test(values.name)) {
      errors.name = 'This field only accept letters!';
    }
    if (!values.amount) {
      errors.amount = 'The amount is required!';
    } else if (!/^[0-9]*$/gm.test(values.amount)) {
      errors.amount = 'This field only accept numbers!';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: nameBefore,
      amount: amountBefore,
    },
    validate,
    onSubmit: (values) => {
      const budgetEdit = { ...values, amount: Number(values.amount, 10), id };
      action.editBudget(budgetEdit, dispatch);

      setTimeout(() => {
        showModalEditHandler();
        formik.resetForm({
          name: '',
          amount: '',
        });
      }, 1500);
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <Button onClick={showModalEditHandler} className="btn bg-navy">
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={showModalEdit}>
        <Modal.Header>
          <h3>
            Edit your Budget : <b className="text-info">{nameBefore}</b>
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
            <div className="d-flex flex-column justify-content-center m-3">
              <label className="align-self-center">Name</label>
              <p className="align-self-center">
                Name before: <span className="text-danger">{nameBefore}</span>
              </p>
              <input
                type="text"
                placeholder="Budget Name..."
                name="name"
                autoComplete="off"
                onChange={formik.handleChange}
                value={formik.values.name}
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
            <div className="d-flex flex-column justify-content m-3">
              <label className="align-self-center">Amount</label>
              <p className="align-self-center">
                Amount before: <span className="text-danger">${amountBefore}</span>
              </p>
              <input
                type="text"
                placeholder="amount..."
                name="amount"
                onChange={formik.handleChange}
                autoComplete="off"
                value={formik.values.amount}
                className={
                  formik.errors.amount
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              />
              {formik.errors.amount ? (
                <p className="text text-danger align-self-center">{formik.errors.amount}</p>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex justify-content-center">
              <Button type="submit" className="btn btn-success">
                Edit wallet
              </Button>
              <Button className="btn btn-danger ml-3" onClick={showModalEditHandler}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BudgetsEdit;
