import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import FormDefault from '../../commons/FormDefault/FormDefault';

export default function NewCategories() {
  const [state, setstate] = useState(false);

  const setModalHandler = () => {
    setstate(!state);
  };

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
