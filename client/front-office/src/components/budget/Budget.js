import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as action from '../../actions/creators';
import BudgetsEdit from './budgetEdit';
import InternalLoader from '../loaders/InternalLoader';
import BudgetModal from './BudgetModal';
import Emptypage from '../FormDefault/Emptypage';

function Budget() {
  const [loading, setLoading] = useState(true);
  const [sort, setOrder] = useState('');

  const budgets = useSelector((state) => state.budgetReducer.budgets);
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);
  const dispatch = useDispatch();
  useEffect(() => {
    action.getBudget(dispatch);
    reset();
  }, [dispatch]);

  useEffect(() => {
    if (sort === 'A-Z') {
      action.sortBudgetAz(dispatch);
    }
    if (sort === 'Z-A') {
      action.sortBudgetZa(dispatch);
    }
    if (sort === '+ amount') {
      action.sortBudgetAmount(dispatch);
    }
    if (sort === '- amount') {
      action.sortBudgetMinAmount(dispatch);
    }
    if (sort === 'all') {
      action.getBudget(dispatch);
    }
  }, [sort, dispatch]);

  const filterLabels = budgets.filter((x) => x.status === true);
  const data = {
    labels: filterLabels.slice(0, 10).map((x) => x.name.slice(0, 4)),
    datasets: [
      {
        label: '# of Votes',
        data: budgets.slice(0, 10).map((x) => (x.status ? x.amount : '')),
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

  const options = {
    indexAxis: 'y',

    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  const changeStatus = (id, status) => {
    const newData = { id, status: !status };
    action.changeBudgetStatus(newData, dispatch);
  };

  const balances = budgets.filter((w) => w.status === true);
  const total = balances.reduce((acc, b) => acc + parseInt(b.amount, 10), 0);
  const cantBudgets = () => {
    if (user) return user.plan.name === 'Free' ? 5 : 10;
    return '';
  };

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  // const orderName = () => {
  //   budgets.sort((a, b) => {
  //     const aa = a.name.toLowerCase();
  //     const bb = b.name.toLowerCase();

  //     if (aa < bb) {
  //       return -1;
  //     }
  //     if (aa > bb) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   reset();
  // };
  // const orderAmount = () => {
  //   budgets.sort((a, b) => {
  //     const aa = a.amount;
  //     const bb = b.amount;

  //     if (aa < bb) {
  //       return -1;
  //     }
  //     if (aa > bb) {
  //       return 1;
  //     }
  //     return 0;
  //   });
  //   reset();
  // };

  // const orderStatus = () => {
  //   budgets.sort((a, b) => {
  //     if (a.status && !b.status) return -1;
  //     if (b.status && !a.status) return 1;
  //     return 0;
  //   });
  //   reset();
  // };

  return (
    <div className="mx-3 mt-3">
      <div className="d-flex flex-column justify-content-around">
        <div className="align-self-center" style={{ width: '100%' }}>
          <div className="card">
            {!loading && <InternalLoader />}
            {budgets.length === 0 ? (
              ''
            ) : (
              <>
                <div className="card-header bg-navy d-flex justify-content-between ">
                  <h3>Budgets Info</h3>
                </div>
                <div className="d-flex justify-content-around">
                  <div className="col-5 col-lg-3 mt-5">
                    <div className="small-box bg-warning mt-4 ">
                      <div className="inner">
                        <h4>Total Amount</h4>
                        <h5 className="font-weight-bold">$ {total}.00</h5>
                      </div>
                      <div className="icon">
                        <i className="fas fa-money-check-alt" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Doughnut width={300} height={250} data={data} options={options} />
                  </div>
                </div>
              </>
            )}

            <div className="card-header bg-navy d-flex justify-content-between">
              <h2 className="card-title align-self-center mr-auto ">Budgets Details</h2>
              {budgets.length < cantBudgets ? (
                <BudgetModal />
              ) : (
                <Button className="btn-warning" disabled>
                  You cant add a new Budget
                </Button>
              )}
            </div>
            {budgets.length === 0 ? (
              <Emptypage name="Budgets" />
            ) : (
              <table className="table table-bordered ">
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="d-flex justify-content-center">
                        <b className="mr-3">Budget Name</b>
                        <select onChange={(e) => setOrder(e.target.value)}>
                          <option value="all" selected>
                            all
                          </option>
                          <option value="A-Z">A-Z</option>
                          <option value="Z-A">Z-A</option>
                        </select>
                      </div>
                    </th>
                    <th scope="col">
                      <div className="d-flex justify-content-center">
                        <b className="mr-3">Ammount</b>
                        <select onChange={(e) => setOrder(e.target.value)}>
                          <option value="all">all</option>
                          <option value="+ amount">+ Amount</option>
                          <option value="- amount">- Amount</option>
                        </select>
                      </div>
                    </th>
                    <th scope="col">
                      <div className="d-flex justify-content-center">
                        <b>Status</b>
                      </div>
                    </th>

                    <th scope="col">
                      <div className="d-flex justify-content-center">
                        <b>Actions</b>
                      </div>
                    </th>
                  </tr>
                </thead>
                {loading &&
                  budgets &&
                  budgets.slice(0, cantBudgets).map((x) => (
                    <>
                      <tbody>
                        <tr>
                          <th scope="row">{x.name}</th>

                          <td>${x.amount}</td>
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
                                  <BudgetsEdit
                                    id={x.id}
                                    nameBefore={x.name}
                                    amountBefore={x.amount}
                                  />
                                      
                                  <button
                                    type="button"
                                    className="btn bg-gradient-danger"
                                    onClick={() => changeStatus(x.id, x.status)}
                                  >
                                    <i className="far fa-trash-alt" />
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  className="btn bg-gradient-success"
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
            )}
          </div>
        </div>
      </div>

      <br />
    </div>
  );
}
export default Budget;
