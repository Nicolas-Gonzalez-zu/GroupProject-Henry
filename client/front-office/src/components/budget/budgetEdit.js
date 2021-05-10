import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

const BudgetsEdit = ({ id, name }) => {
  const [errors, setErrors] = useState({});
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [newBudget, setnewBudget] = useState({
    name: '',
    amount: null,
  });
  const dispatch = useDispatch();
  const showModalHandler = () => {
    setShowModalEdit(!showModalEdit);
    console.log(id);
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
      return alert('You need to fill both budgets');
    }
    if (typeof newBudget.name === 'number' || /[a-zA-Z]+/g.test(newBudget.amount)) {
      console.log(typeof newBudget.name, typeof newBudget.amount);
      return alert("Please set the values corretly, f.e: name:'cash', balance: 1300");
    }
    const budgetEdits = { ...newBudget, id };
    action.editBudget(budgetEdits, dispatch);
    setShowModalEdit(!showModalEdit);
    setnewBudget({
      name: '',
      amount: null,
    });
    return alert('Budget changed!');
  };

  const validate = (budget) => {
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
                <span className="input-group-text">Bn</span>
              </div>
              <input
                type="text"
                placeholder="Budget Name..."
                className={`${errors.name && 'border border-danger'}`}
                name="name"
                onChange={setnewBudgetHandler}
                value={newBudget.name}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="text"
                className={`${errors.amount && 'border border-danger'}`}
                placeholder="Amount..."
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
      </Modal>
    </div>
  );
};

export default BudgetsEdit;
