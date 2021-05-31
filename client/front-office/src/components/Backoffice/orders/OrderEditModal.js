import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import FormDefault from '../../FormDefault/FormDefault';

const OrderModal = ({ id, users, status, myStatus, assignedUser, startDate, endDate }) => {
  const [showModal, setShowModal] = useState(false);

  const setShowModalHandler = () => {
    setShowModal(!showModal);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.user) {
      errors.user = 'User is required';
    }
    if (!values.status) {
      errors.status = 'Status is required';
    }
    if (!values.startDate) {
      errors.startDate = 'Start date is required';
    }
    if (!values.endDate) {
      errors.endDate = 'End date is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      user: assignedUser,
      status: myStatus,
      startDate,
      endDate,
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      setTimeout(() => {
        setShowModalHandler();
        // formik.resetForm({ user: '', status: '', startDate: '', endDate: '' });
      }, 1500);
    },
    enableReinitialize: true,
  });
  return (
    <div>
      <Button className="btn-success" onClick={setShowModalHandler}>
        Edit Order
      </Button>
      <Modal show={showModal}>
        <Modal.Header>Edit Order n°{id}</Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column justify-content-center"
            onSubmit={formik.handleSubmit}
          >
            <FormDefault
              values={formik.values}
              errors={formik.errors}
              handleChange={formik.handleChange}
              inputType={['select', 'select', 'date', 'date']}
              selectFrom={[users, status]}
            />
            <footer className="d-flex justify-content-center">
              <Button className="btn-success mr-3" type="submit">
                Edit
              </Button>
              <Button className="btn-danger" onClick={setShowModalHandler}>
                Cancel
              </Button>
            </footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default OrderModal;
