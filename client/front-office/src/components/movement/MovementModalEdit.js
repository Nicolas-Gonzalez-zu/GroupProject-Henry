import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

export default function MovementModalEdit({ id, description, date }) {
  const [edit, setEdit] = useState(false);
  const [stateValidate, setStateValidate] = useState(false);
  const dispatch = useDispatch();

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
      description,
      date,
    },
    validate,
    onSubmit: (values) => {
      setStateValidate(true);
      setTimeout(() => setStateValidate(false), 1000);
      setTimeout(() => setEdit(false), 1500);

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
          <p>
            Movement to Edit ~ ID: <b className="text-info">{id}</b>
          </p>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label>Description</label>
            <p>
              Description before: <span className="text-danger">{description}</span>
            </p>
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
            <p>
              Date before:{' '}
              <span className="text-danger">{date.replace('T', ' ~ ').replace('.000Z', ' ')}</span>
            </p>
            <input
              className="form-control col-7"
              type="datetime-local"
              name="date"
              id="date"
              onChange={formik.handleChange}
              value={formik.values.date}
            />
            {formik.errors.date ? <b className="text-danger">{formik.errors.date}</b> : null}

            <Button type="submit" className="btn btn-success">
              Edit
            </Button>
          </form>{' '}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={setEditOn} className="btn btn-danger">
            Cancel
          </Button>
        </Modal.Footer>
        <Alert show={stateValidate} variant="success" className="text-center m-2">
          Movements Changed Success
        </Alert>
      </Modal>
    </>
  );
}
