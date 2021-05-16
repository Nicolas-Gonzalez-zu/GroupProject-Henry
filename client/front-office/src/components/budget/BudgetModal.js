import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import * as action from '../../actions/creators';

const BudgetModal = () => {
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
    if (!values.amount) {
      errors.amount = 'The amount is required!';
    } else if (!/^[0-9]*$/gm.test(values.amount)) {
      errors.amount = 'This field only accept numbers!';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
    },
    validate,
    onSubmit: (values) => {
      const newBudget = { ...values, amount: Number(values.amount, 10) };
      action.addBudget(newBudget, dispatch);
      setTimeout(() => {
        setModalHandler();
        formik.resetForm({ name: '', amount: '' });
      }, 1500);
    },
  });
  return (
    <div>
      <Button onClick={setModalHandler} className="btn-success">
        Add Budget
      </Button>
      <Modal show={showModal}>
        <Modal.Header>
          <h3>
            Create you new <b className="text-info">Budget</b>
          </h3>
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
                placeholder="Budget Name..."
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
              <label className="align-self-center">Amount</label>
              <input
                type="text"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                placeholder="300..."
                autoComplete="off"
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
                Add Budget
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
export default BudgetModal;
