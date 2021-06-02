import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import FormDefault from '../../commons/FormDefault/FormDefault';
import * as action from '../../../actions/backoffice/creators';

export default function NewCategories() {
  const [state, setstate] = useState(false);
  const authAlert = useSelector((store) => store.authReducers.authAlert);
  const dispatch = useDispatch();

  const setModalHandler = () => {
    setstate(!state);
  };

  useEffect(() => {
    if (authAlert.fire) {
      Swal.fire({
        title: authAlert.message,
        icon: authAlert.type,
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        action.setAlert(dispatch);
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
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validate,
    onSubmit: (values) => {
      action.addCategory(values, dispatch);
      setTimeout(() => {
        setModalHandler();
        formik.resetForm({ name: '' });
      }, 1500);
    },
  });

  return (
    <div>
      <Button onClick={setModalHandler} className="btn bg-navy">
        Create a New categories
      </Button>
      <Modal show={state}>
        <Modal.Header>
          <h3>Create a new Category</h3>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <FormDefault
            values={formik.values}
            errors={formik.errors}
            handleChange={formik.handleChange}
            inputType={['text']}
          />
          <Modal.Footer>
            <Button type="submit" className="btn btn-success col-2">
              Create
            </Button>

            <Button onClick={setModalHandler} className="btn btn-danger col-2">
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
