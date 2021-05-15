import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as action from '../../../actions/creators';

const IncomeModalEdit = ({ id, description, date }) => {
  const [showModal, setShowModal] = useState(false);
  const authAlert = useSelector((state) => state.authReducers.authAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authAlert.fire) {
      const position = authAlert.type === 'success' ? 'center' : 'top-end';

      Swal.fire({
        title: authAlert.title,
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
    if (!values.date) {
      errors.date = 'the generation date is required';
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
      movement_id: id,
      description: '',
      date: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);

      action.editIncome(values, dispatch);
    },
  });
  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={showModalHandler}>
        <i className="fas fa-edit" />
      </Button>
      <Modal show={showModal}>
        <Modal.Header>Edit Your Income</Modal.Header>
        <Modal.Body>
          <form
            className="form-column d-flex flex-column justify-content-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="card-body">
              <div className=" d-inline-flex form-group flex-column ">
                <label htmlFor="inputPassword3" className="col-4 col-form-label">
                  Generation Date
                </label>
                <div className="col-7">
                  <p>Date before: {date.replace('T', ' ~ ').replace('.000Z', ' ')}</p>
                  <input
                    type="datetime-local"
                    className={formik.errors.date ? 'form-control is-invalid' : 'form-control'}
                    placeholder=".col-3"
                    name="date"
                    id="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.date ? (
                    <p className="text-danger">
                      <b>{formik.errors.date}</b>
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="d-flex form-group flex-column align-self-center">
                <label htmlFor="inputPassword3" className="col-3 col-form-label">
                  Description
                </label>
                <div className="col-7">
                  <input
                    type="text"
                    className={
                      formik.errors.description ? 'form-control is-invalid' : 'form-control'
                    }
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
            <div className="card-footer d-flex justify-content-between w-100">
              <Button type="submit" onClick={showModalHandler} className="btn btn-success">
                Edit income
              </Button>
              <Button className="btn btn-info " onClick={showModalHandler}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default IncomeModalEdit;
