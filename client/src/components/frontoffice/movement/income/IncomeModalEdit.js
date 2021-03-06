import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import FormDefault from '../../../commons/FormDefault/FormDefault';
import * as action from '../../../../actions/frontoffice/creators';

const IncomeModalEdit = ({ name, id, description, date }) => {
  const [onlyDate, Onlytime] = date.replace('T', '~').replace('.000Z', '').split('~');
  // console.log(onlyDate, 'soy el date');
  // console.log(Onlytime, 'dsdsas');
  // console.log(date);
  const [showModalEdit, setShowModalEdit] = useState(false);
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
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type, authAlert.title]);

  const showModalEditHandler = () => {
    setShowModalEdit(!showModalEdit);
  };

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
    if (!values.time) {
      errors.time = 'The time is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      date: onlyDate,
      time: Onlytime,
      description,
    },
    validate,
    onSubmit: (values) => {
      // alert(values.time);
      const newValues = {
        ...values,
        // generation_date: `${values.date}T${values.time}:00.000Z`,
        generation_date: new Date(`${values.date}T${values.time}:00.000Z`),
        movement_id: id,
      };
      action.editIncome(newValues, dispatch);
      setTimeout(() => {
        showModalEditHandler();
      }, 1500);
    },
    enableReinitialize: true,
  });

  return (
    <div className="d-flex">
      <Button onClick={showModalEditHandler} className="bg-navy">
        <i className="fas fa-edit" />
      </Button>
      <Modal show={showModalEdit}>
        <Modal.Header className="d-flex flex-column justify-content-between w-100 p-2 rounded-top">
          <div>
            <h4>
              Edit your Income for <b className="text-olive">{name}</b>
            </h4>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={formik.handleSubmit}
          >
            <FormDefault
              values={formik.values}
              errors={formik.errors}
              handleChange={formik.handleChange}
              inputType={['date', 'time', 'text']}
            />
            <div className="d-flex justify-content-center mt-3">
              <Button type="submit" className="btn btn-success">
                Edit income
              </Button>
              <Button
                type="button"
                className="btn btn-danger align-self-end ml-3"
                onClick={showModalEditHandler}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default IncomeModalEdit;
