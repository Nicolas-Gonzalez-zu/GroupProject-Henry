import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

const BudgetsEdit = ({ id }) => {
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
  };
  const submitEditBudget = () => {
    if (!newBudget.name || !newBudget.amount) {
      return alert('You need to fill both inputs');
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

  return (
    <div>
      <Button onClick={showModalHandler} className="btn btn-info">
        <i className="fas fa-edit	" />
      </Button>
      <Modal show={showModalEdit}>
        <Modal.Header>Edit your Budget please {id}</Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column">
            <input
              type="text"
              placeholder="Budget Name..."
              name="name"
              onChange={setnewBudgetHandler}
              value={newBudget.name}
            />
            <input
              type="text"
              placeholder="Amount..."
              name="amount"
              onChange={setnewBudgetHandler}
              value={newBudget.amount}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-success" onClick={submitEditBudget}>
            Budget wallet
          </Button>
          <Button onClick={showModalHandler}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BudgetsEdit;
