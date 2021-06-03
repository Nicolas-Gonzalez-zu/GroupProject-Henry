import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';
import * as action from '../../../actions/backoffice/creators';
import statusBO from '../../../utils/backoffice/statusBO';

const OrderModal = ({ id, users, myStatus, assignedUserBefore, startDate, endDate, priority }) => {
  const [showModal, setShowModal] = useState(false);
  const [onlyStartDate, onlyStartTime] = startDate
    ? startDate.replace('T', '~').replace('.000Z', '').split('~')
    : '0000-00-00T00:00:00.000Z'.replace('T', '~').replace('.000Z', '').split('~');

  const [onlyEndDate, onlyEndTime] = endDate
    ? endDate.replace('T', '~').replace('.000Z', '').split('~')
    : '0000-00-00T00:00:00.000Z'.replace('T', '~').replace('.000Z', '').split('~');
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

  const setShowModalHandler = () => {
    setShowModal(!showModal);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.user) {
      errors.user = 'User is required';
    }
    if (values.user === assignedUserBefore) {
      errors.user = 'Please, select user again';
    }
    if (!values.status) {
      errors.status = 'Status is required';
    }
    if (values.status === 'unassigned') {
      errors.status = 'Please, you need to specify a status';
    }
    if (!values.startDate) {
      errors.startDate = 'Start date is required';
    }
    if (values.startDate === '0000-00-00') {
      errors.startDate = 'Please, you need to set an Start Date';
    }
    if (!values.endDate) {
      errors.endDate = 'End date is required';
    }
    if (values.endDate === '0000-00-00') {
      errors.endDate = 'Please, you need to set an End Date';
    }
    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = 'Please, the end date must be next to start date';
    }
    if (!values.startTime) {
      errors.startTime = 'Start Time is required';
    }

    if (!values.endTime) {
      errors.endTime = 'End time is required';
    }
    return errors;
  };
  // console.log(users, 'hu');
  const formik = useFormik({
    initialValues: {
      user: '',
      status: myStatus,
      startDate: onlyStartDate,
      startTime: onlyStartTime,
      endDate: onlyEndDate,
      endTime: onlyEndTime,
    },
    validate,
    onSubmit: (values) => {

      const newStartTime =
        values.startTime === onlyStartTime
          ? `${values.startTime}.000Z`
          : `${values.startTime}:00.000Z`;

      const newEndTime =
        values.endTime === onlyEndTime ? `${values.endTime}.000Z` : `${values.endTime}:00.000Z`;

      const newOrder = {
        id,
        assigned_user_id: Number(values.user),
        start_date: `${values.startDate}T${newStartTime}`,
        end_date: `${values.endDate}T${newEndTime}`,
      
        status: values.status,
      };
      console.log(newOrder, 'neww');
      action.editOrder(newOrder, dispatch);

      setTimeout(() => {
        setShowModalHandler();
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
            <div className="d-flex flex-column m-3">
              <label className="align-self-center">User</label>
              <select
                onChange={formik.handleChange}
                name="user"
                value={formik.values.user}
                className={
                  formik.errors.user
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              >
                <option disabled>{assignedUserBefore}</option>
                {users &&
                  users.map((u) => (
                    <option value={u.id}>
                      {u.first_name} {u.last_name}
                    </option>
                  ))}
              </select>
              {formik.errors.user ? (
                <b className="align-self-center text-danger">{formik.errors.user}</b>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column m-3">
              <label className="align-self-center">Status</label>
              <select
                onChange={formik.handleChange}
                name="status"
                value={formik.values.status}
                className={
                  formik.errors.status
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              >
                <option value="unassigned" disabled>
                  unassigned
                </option>
                {statusBO && statusBO.map((u) => <option value={u.id}>{u.name}</option>)}
              </select>
              {formik.errors.status ? (
                <b className="align-self-center text-danger">{formik.errors.status}</b>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column m-3">
              <label className="align-self-center">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                className={
                  formik.errors.startDate
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              />
              {formik.errors.startDate ? (
                <b className="align-self-center text-danger">{formik.errors.startDate}</b>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column m-3">
              <label className="align-self-center">Start Time</label>
              <input
                type="time"
                name="startTime"
                placeholder={onlyStartTime}
                value={formik.values.startTime}
                onChange={formik.handleChange}
                className={
                  formik.errors.startTime
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              />
              {formik.errors.startTime ? (
                <b className="align-self-center text-danger">{formik.errors.startTime}</b>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column m-3">
              <label className="align-self-center">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                className={
                  formik.errors.endDate
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              />
              {formik.errors.endDate ? (
                <b className="align-self-center text-danger">{formik.errors.endDate}</b>
              ) : (
                ''
              )}
            </div>
            <div className="d-flex flex-column m-3">
              <label className="align-self-center">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formik.values.endTime}
                onChange={formik.handleChange}
                className={
                  formik.errors.endTime
                    ? 'form-control is-invalid w-50 align-self-center'
                    : 'form-control w-50 align-self-center'
                }
              />
              {formik.errors.endTime ? (
                <b className="align-self-center text-danger">{formik.errors.endTime}</b>
              ) : (
                ''
              )}
            </div>

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
