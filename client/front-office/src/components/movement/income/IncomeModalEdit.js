import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as action from '../../../actions/creators';

const IncomeModalEdit = ({ id, description, date }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};
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
      movement_id: id,
      description,
      date,
    },
    validate,
    onSubmit: (values) => {
      setShowModal(!showModal);
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
          <form className="form-horizontal" onSubmit={formik.handleSubmit}>
            <div className="card-body">
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
                  Description
                </label>
                <div className="col-5">
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
              <Button type="submit" className="btn btn-success">
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
