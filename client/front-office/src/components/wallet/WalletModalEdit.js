import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import FormDefault from '../FormDefault/FormDefault';
import * as action from '../../actions/creators';

const WalletModalEdit = ({ name, id }) => {
  const [showModalEdit, setShowModalEdit] = useState(false);

  const dispatch = useDispatch();

  const showModalEditHandler = () => {
    setShowModalEdit(!showModalEdit);
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
      const walletEdited = { ...values, balance: Number(values.balance, 10), id };
      action.editWallet(walletEdited, dispatch);

      setTimeout(() => {
        showModalEditHandler();
        formik.resetForm({
          name: '',
        });
      }, 1500);
    },
  });

  return (
    <div>
      <Button onClick={showModalEditHandler} className="btn btn-dark">
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={showModalEdit}>
        <Modal.Header className="d-flex flex-column ">
          <div className="d-flex flex-column">
            <h3>
              Edit your wallet <b className="text-info">{name}</b>{' '}
            </h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
            <FormDefault
              values={formik.values}
              errors={formik.errors}
              handleChange={formik.handleChange}
              inputType={['text', 'text']}
            />
            <div className="d-flex justify-content-center">
              <Button type="submit" className="btn btn-success">
                Edit wallet
              </Button>
              <Button className="btn btn-danger ml-3" onClick={showModalEditHandler}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default WalletModalEdit;
