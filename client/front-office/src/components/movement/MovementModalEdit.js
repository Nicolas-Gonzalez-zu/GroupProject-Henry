import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as action from '../../actions/creators';

export default function MovementModalEdit({ id, description, date }) {
  const [edit, setEdit] = useState(false);

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
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  const validate = (values) => {
    const errors = {};

    if (!values.description) {
      errors.description = 'Description Required';
    } else if (values.description.length < 2) {
      errors.description = 'Description Required Must have at least 3 letters';
    }

    if (!values.date) {
      errors.date = 'Date Required';
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
      setTimeout(() => setEdit(false), 1000);

      action.editMovement(values, dispatch);

      // alert(JSON.stringify(values, null, 2));
    },
  });

  const setEditOn = () => {
    setEdit(!edit);
  };

  return (
    <>
      <Button onClick={setEditOn}>
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={edit}>
        <Modal.Header>
          <h3>
            Movement to Edit ~ ID: <b className="text-info">{id}</b>
          </h3>{' '}
          <Button onClick={setEditOn} className="btn btn-danger">
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="text-center">
            <label>Description</label>
            <p>
              Description before: <span className="text-danger">{description}</span>
            </p>
            <div className="d-block">
              <div className="d-flex justify-content-md-center">
                <input
                  autoComplete="off"
                  className={
                    formik.errors.description
                      ? 'form-control is-invalid col-7 '
                      : 'form-control col-7'
                  }
                  name="description"
                  id="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </div>

              {formik.errors.description ? (
                <b className="text-danger">{formik.errors.description}</b>
              ) : null}
            </div>
            <p>
              Date before:
              <span className="text-danger">{date.replace('T', ' ~ ').replace('.000Z', ' ')}</span>
            </p>
            <div className="d-block">
              <div className="d-flex justify-content-md-center">
                <input
                  className="form-control col-7"
                  type="datetime-local"
                  name="date"
                  id="date"
                  onChange={formik.handleChange}
                  value={formik.values.date}
                />
              </div>
              {formik.errors.date ? <b className="text-danger">{formik.errors.date}</b> : null}
            </div>
            <Button type="submit" className="btn btn-success mt-4 col-6">
              Edit Movement
            </Button>
          </form>{' '}
        </Modal.Body>
      </Modal>
    </>
  );
}
