import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import FormDefault from '../../FormDefault/FormDefault';
import * as action from '../../../actions/creators';

const IncomeAddModal = ({ showModal, showModalHandler }) => {
  const wallets = useSelector((state) => state.walletReducer.wallets);
  // const incomes = useSelector((state) => state.movementReducer.movements);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();

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
    action.getMovements(dispatch);
    action.getWallet(dispatch);
  }, [dispatch, authAlert.fire, authAlert.message, authAlert.type]);

  const validate = (values) => {
    const errors = {};
    if (!/^[0-9]*$/gm.test(values.amount)) {
      errors.amount = 'The amount must be a number';
    } else if (!values.amount) {
      errors.amount = 'The amount is required';
    }
    if (values.wallet === '-') {
      errors.wallet = 'The wallet is required';
    }
    if (!values.date) {
      errors.date = 'The date is required';
    }
    if (!values.time) {
      errors.time = 'The time is required';
    }
    if (!values.description) {
      errors.description = 'The description is required';
    } else if (values.description.length < 5) {
      errors.description = 'The description must contain at least 5 letters';
    }
    return errors;
  };

  const walletsAvailable = wallets.filter((w) => w.status);

  const formik = useFormik({
    initialValues: {
      wallet: '',
      description: '',
      amount: '',
      date: '',
      time: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      const newValues = {
        ...values,
        wallet_id: values.wallet,
        amount: Number(values.amount, 10),
        type: 'INCOME',
        generation_date: `${values.date}T${values.time}:00.000Z`,
      };
      console.log(newValues, 'soy new values');
      action.addIncome(newValues, dispatch);
      setTimeout(() => {
        showModalHandler();
        formik.resetForm({
          wallet: '',
          description: '',
          amount: '',
          generation_date: '',
          generation_time: '',
        });
      }, 1500);
    },
  });
  return (
    <div className="d-flex">
      <Button className="btn btn-warning mr-3" onClick={showModalHandler}>
        Add Income
      </Button>
      <Modal show={showModal}>
        <Modal.Header className="d-flex justify-content-between w-100 p-2 rounded-top">
          <div>
            <h3>Add your Income</h3>
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
              inputType={['select', 'text', 'text', 'date', 'time']}
              selectFrom={[walletsAvailable]}
            />
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-success align-self-end">
                Add Income
              </button>
              <button
                type="button"
                className="btn btn-danger align-self-end ml-3"
                onClick={showModalHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default IncomeAddModal;
