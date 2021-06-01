import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import * as action from '../../../actions/frontoffice/creators';

export default function Dashboard() {
  const budgets = useSelector((state) => state.budgetReducer.budgets);
  const movements = useSelector((state) => state.movementReducer.movements);
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const dispatch = useDispatch();
  const filterbudgets = budgets.filter((x) => x.status === true);
  const filterwallets = wallets.filter((x) => x.status === true);
  useEffect(() => {
    action.getMovements(dispatch);
    action.getBudget(dispatch);
    action.getWallet(dispatch);
  }, [dispatch]);

  const databudget = {
    labels: filterbudgets.slice(0, 10).map((x) => x.name.slice(0, 4)),
    datasets: [
      {
        label: '# of Amount',
        data: filterbudgets.slice(0, 10).map((x) => (x.status ? x.amount : '')),
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

  const datawallet = {
    labels: filterwallets.slice(0, 10).map((x) => x.name.slice(0, 4)),
    datasets: [
      {
        label: '# of Balance',
        data: filterwallets.slice(0, 10).map((x) => (x.status ? x.balance : '')),
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
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="a">
        <div className="d-flex justify-content-center mt-3 p2">
          <div className="col-lg-5">
            <div className="card card-dark card-outline ">
              <div className="card-header">
                <b>Wallets</b>
              </div>
              <div className="card-body">
                {filterwallets.length === 0 ? (
                  <div className="d-block  row">
                    <div className="d-flex justify-content-center row">
                      <img src="https://i.ibb.co/HHVdrSz/Sin-t-tulo-6.png" width="250" alt="" />
                    </div>
                    <h3 className="txtdash text-center ">Your Wallets are Empty</h3>

                    <div className="d-flex justify-content-center">
                      <Link to="/wallet">
                        <button className="btn btn-warning" type="button">
                          <b>Create a new Wallet</b>
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Bar data={datawallet} options={options} />
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card card-dark card-outline">
              <div className="card-header ">
                <b>Budget</b>
              </div>
              <div className="card-body">
                {filterbudgets.length === 0 ? (
                  <div className="d-block  row">
                    <div className="d-flex justify-content-center row">
                      <img src="https://i.ibb.co/jyt7bxZ/budget.png" width="250" alt="" />
                    </div>
                    <h3 className="txtdash text-center ">Your Budgets are Empty</h3>

                    <div className="d-flex justify-content-center">
                      <Link to="/budget">
                        <button className="btn btn-warning" type="button">
                          <b>Create a new Budget</b>
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Bar data={databudget} options={options} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div className="card card-dark card-outline col-lg-10 ">
            <div className="card-header ">
              <h3 className="card-title">
                <b>The last Movements</b>
              </h3>
            </div>
            <div className="card-body table-responsive p-0">
              {movements.length === 0 ? (
                <div className="d-block">
                  <div className="d-flex justify-content-center">
                    <img src="https://i.ibb.co/rbTC9Gs/movements.png" width="350" alt="" />
                  </div>
                  <h3 className="txtdash text-center ">Your Movements are Empty</h3>
                </div>
              ) : (
                <table className="table table-valign-middle">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements &&
                      movements.slice(0, 5).map((m) => (
                        <tr key={m.id}>
                          <td>{m.id}</td>
                          <td>{m.description}</td>
                          <td>$ {m.amount}</td>
                          <td>{m.type}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
