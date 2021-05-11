import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

const BudgetsEdit = ({ id, name }) => {
  const [errors, setErrors] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [stateError, setstateError] = useState(false);
  const [stateok, setstateok] = useState(false);
  const [newBudget, setnewBudget] = useState({
    name: '',
    amount: null,
  });
  const dispatch = useDispatch();
  const showModalHandler = () => {
    setShowModalEdit(!showModalEdit);
  };

  const showModal = () => {
    setstateError(!stateError);
    setTimeout(() => setstateError(false), 2000);
  };
  const showModalok = () => {
    setstateok(!stateok);
    setTimeout(() => setstateok(false), 1000);
  };

  const setnewBudgetHandler = (e) => {
    setnewBudget({ ...newBudget, [e.target.name]: e.target.value });
    setErrors(
      validate({
        ...newBudget,
        [e.target.name]: e.target.value,
      }),
    );
  };
  const submitEditBudget = () => {
    if (!newBudget.name || !newBudget.amount) {
      return showModal();
    }
    if (
      typeof newBudget.name === 'number' ||
      /[a-zA-Z]+/g.test(newBudget.amount) ||
      newBudget.amount.length < 2
    ) {
      console.log(typeof newBudget.name, typeof newBudget.amount);
      return showModal();
    }
    const budgetEdits = { ...newBudget, id };
    action.editBudget(budgetEdits, dispatch);
    setTimeout(() => setShowModalEdit(!showModalEdit), 1000);
    setnewBudget({
      name: '',
      amount: null,
    });
    return showModalok();
  };

  const validate = () => {
    const error = {};
    console.log(newBudget.amount, 'asa');

    if (!newBudget.name) {
      error.name = ' • Budget name is required';
    }

    if (isNaN(newBudget.amount) || !newBudget.amount) {
      error.amount = ' • Amount must be a Number!';
    }

    return error;
  };

  return (
    <div>
      <Button onClick={showModalHandler} className="btn btn-info">
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={showModalEdit}>
        <Modal.Header>
          <p>
            Edit your Budget <span className="text-info">{name}</span>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex center">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-file-contract" />
                </span>
              </div>
              <input
                type="text"
                placeholder="Budget Name..."
                className={`${errors.name ? 'form-control is-invalid' : 'form-control'}`}
                name="name"
                autoComplete="off"
                onChange={setnewBudgetHandler}
                value={newBudget.name}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-dollar-sign" />
                </span>
              </div>
              <input
                type="text"
                className={`${errors.amount ? 'form-control is-invalid' : 'form-control '}`}
                placeholder="Amount..."
                autoComplete="off"
                name="amount"
                onChange={setnewBudgetHandler}
                value={newBudget.amount}
              />
            </div>
          </div>
          <p className="d-flex justify-content-around  ">
            {errors.name && <p className="text-danger">{errors.name}!</p>}
            {errors.amount && <p className="text-danger">{errors.amount}!</p>}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-success" onClick={submitEditBudget}>
            Change Budget
          </Button>
          <Button onClick={showModalHandler} className="btn-danger">
            Cancel
          </Button>
        </Modal.Footer>
        <Alert show={stateError} variant="danger" className="text-center m-2">
          Please complete the both values corretly
        </Alert>
        <Alert show={stateok} variant="success" className="text-center m-2">
          Budget Change success
        </Alert>
      </Modal>
    </div>
  );
};

export default BudgetsEdit;
