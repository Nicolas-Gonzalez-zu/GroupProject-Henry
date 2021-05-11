import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import * as action from '../../actions/creators';
import BudgetsEdit from './budgetEdit';

function Budget() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [stateError, setstateError] = useState(false);
  const [stateok, setstateok] = useState(false);
  const [newBudgets, setNewBudgets] = useState({
    name: '',
    amount: '',
  });

  const budgets = useSelector((state) => state.budgetReducer.budgets);
  const dispatch = useDispatch();
  useEffect(() => {
    action.getBudget(dispatch);
  }, [dispatch]);

  const filterLabels = budgets.filter((x) => x.status === true);
  const data = {
    labels: filterLabels.map((x) => x.name),
    datasets: [
      {
        label: '# of Votes',
        data: budgets.map((x) => (x.status ? x.amount : '')),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleChange = (e) => {
    setNewBudgets({
      ...newBudgets,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...newBudgets,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newBudgets.name || !newBudgets.amount) {
      return showModal();
    }
    if (typeof newBudgets.name === 'number' || /[a-zA-Z]+/g.test(newBudgets.amount)) {
      console.log(typeof newBudgets.name, typeof newBudgets.amount);
      return showModal();
    }
    action.addBudget(newBudgets, dispatch);

    return showModalok();
  };

  const changeStatus = (id, status) => {
    const newData = { id, status: !status };
    action.changeBudgetStatus(newData, dispatch);
  };

  const balances = budgets.filter((w) => w.status === true);
  const total = balances.reduce((acc, b) => acc + parseInt(b.amount, 10), 0);

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const orderId = () => {
    budgets.sort((a, b) => {
      const aa = a.id;
      const bb = b.id;

      if (aa < bb) {
        return -1;
      }
      if (aa > bb) {
        return 1;
      }
      return 0;
    });
    reset();
  };
  const orderName = () => {
    budgets.sort((a, b) => {
      const aa = a.name.toLowerCase();
      const bb = b.name.toLowerCase();

      if (aa < bb) {
        return -1;
      }
      if (aa > bb) {
        return 1;
      }
      return 0;
    });
    reset();
  };
  const orderAmount = () => {
    budgets.sort((a, b) => {
      const aa = a.amount;
      const bb = b.amount;

      if (aa < bb) {
        return -1;
      }
      if (aa > bb) {
        return 1;
      }
      return 0;
    });
    reset();
  };

  const orderStatus = () => {
    budgets.sort((a, b) => {
      if (a.status && !b.status) return -1;
      if (b.status && !a.status) return 1;
      return 0;
    });
    reset();
  };

  const validate = () => {
    const error = {};

    if (!newBudgets.name || newBudgets.name.length < 2) {
      error.name = ' • Budget name is required';
    }

    if (isNaN(newBudgets.amount) || !newBudgets.amount) {
      error.amount = ' • Amount must be a Number!';
    }

    return error;
  };

  const showModal = () => {
    setstateError(!stateError);
    setTimeout(() => setstateError(false), 2000);
  };
  const showModalok = () => {
    setstateok(!stateok);
    setTimeout(() => setstateok(false), 1000);
  };
  return (
    <div className="mx-3 mt-3">
      <div className="d-flex justify-content-center">
        <div className="col-lg-3 col-6 ">
          <div className="small-box bg-info">
            <div className="inner">
              <h3 className="text-center"> Total ${total}</h3>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Doughnut width={200} height={200} data={data} options={{ maintainAspectRatio: false }} />
      </div>

      <br />

      <div className="row">
        <div className="col-12 ">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col">
                  <button type="button" className="btn btn-light" onClick={() => orderId()}>
                    <b>ID</b>
                  </button>
                </th>
                <th scope="col">
                  <button type="button" className="btn btn-light" onClick={() => orderName()}>
                    <b>Budget Name</b>
                  </button>
                </th>

                <th scope="col">
                  <button type="button" className="btn btn-light" onClick={() => orderAmount()}>
                    <b>Ammount</b>
                  </button>
                </th>
                <th scope="col">
                  <button type="button" className="btn btn-light" onClick={() => orderStatus()}>
                    <b>Status</b>
                  </button>
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {loading &&
              budgets &&
              budgets.map((x) => (
                <>
                  <tbody>
                    <tr>
                      <th scope="row">{x.id}</th>
                      <td>{x.name}</td>
                      <td>${x.amount}.00</td>
                      <td>
                        {x.status ? (
                          <p className="text-success">
                            <b>Available</b>
                          </p>
                        ) : (
                          <p className="text-danger">
                            <b>Disable</b>
                          </p>
                        )}
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                              
                          {x.status ? (
                            <>
                              <BudgetsEdit id={x.id} name={x.name} />
                                  
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => changeStatus(x.id, x.status)}
                              >
                                <i className="far fa-trash-alt" />
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => changeStatus(x.id, x.status)}
                            >
                              <i className="fas fa-check" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </>
              ))}
          </table>
          <div>
            <button
              className="btn btn-success btn-lg btn-block"
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Open to Create a New Budget
            </button>
          </div>
          <div className="collapse" id="collapseExample">
            <div className="card card-body ">
              <form>
                <div className="d-flex justify-content-center">
                  <b>                            Budget Name </b>                              
                  <b>   Budget Ammount </b>                              
                </div>
                <div className="d-flex justify-content-center ">
                  <div className="d-flex justify-content-center col-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-file-contract" />
                      </span>
                    </div>
                    <input
                      placeholder="Budget name..."
                      type="text"
                      className={`${errors.name ? 'form-control is-invalid' : 'form-control'}`}
                      name="name"
                      autoComplete="off"
                      onChange={(e) => handleChange(e)}
                      value={newBudgets.name}
                    />
                      
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-dollar-sign" />
                      </span>
                    </div>
                    <input
                      placeholder="Budget amount..."
                      type="text"
                      className={`${errors.amount ? 'form-control is-invalid' : 'form-control'}`}
                      name="amount"
                      autoComplete="off"
                      onChange={(e) => handleChange(e)}
                      value={newBudgets.amount}
                    />
                     
                  </div>
                      
                </div>
                <p className="d-flex justify-content-center  ">
                  {errors.name && <p className="text-danger">{errors.name}!</p>}    
                  {errors.amount && <p className="text-danger">{errors.amount}!</p>}
                </p>{' '}
                <div className="d-flex justify-content-center">
                  <Alert show={stateError} variant="danger">
                    Please complete the both values corretly
                  </Alert>
                  <Alert show={stateok} variant="success">
                    Budget Change success
                  </Alert>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm "
                    onClick={(e) => handleSubmit(e)}
                  >
                    Create a New Budget
                  </button>
                </div>
              </form>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}
export default Budget;
