import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import FormDefault from '../../commons/FormDefault/FormDefault';
import * as action from '../../../actions/frontoffice/creators';

export default function ExpenseModalEdit({ id, description, date }) {
  const [edit, setEdit] = useState(false);
  const [onlyDate, onlyTime] = date.replace('T', '~').replace('.000Z', '').split('~');

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
        action.setAlert(dispatch);
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
    if (!values.time) {
      errors.time = 'Time Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      date: onlyDate,
      time: onlyTime,
      description,
    },
    validate,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        generation_date: new Date(`${values.date}T${values.time}:00.000Z`),
        movement_id: id,
      };
      setTimeout(() => setEdit(false), 1000);
      action.editMovement(newValues, dispatch);
    },
    enableReinitialize: true,
  });

  const setEditOn = () => {
    setEdit(!edit);
  };

  return (
    <>
      <Button onClick={setEditOn} className="bg-navy">
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={edit}>
        <Modal.Header>
          <h3>
            Movement to Edit ~ ID: <b className="text-olive">{id}</b>
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className="text-center">
            <FormDefault
              values={formik.values}
              errors={formik.errors}
              handleChange={formik.handleChange}
              inputType={['date', 'time', 'text']}
            />
            <Button type="submit" className="btn btn-success mt-4 col-4 ml-1">
              Edit Movement
            </Button>
            <Button onClick={setEditOn} className="btn btn-danger mt-4 ml-4">
              Cancel
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
