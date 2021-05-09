import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

function Budget() {
  const [loading, setLoading] = useState(true);
  const [budgetData, setBudgetData] = useState([]);

  const [newBudgets, setNewBudgets] = useState({
    id: '',
    name: '',
    value: '',
    limit: '',
  });

  const data = {
    labels: budgetData.map((x) => x.name),
    datasets: [
      {
        label: '# of Votes',
        data: budgetData.map((x) => x.value),
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
      id: Math.floor(Math.random() * (100 - 0 + 1) + 0),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBudgetData([...budgetData, newBudgets]);
  };

  const deleteBud = (id) => {
    console.log('entraendelete');
    setBudgetData(budgetData.filter((x) => x.id !== id));
  };

  const modificateBud = (id) => {
    const modibud = budgetData.find((x) => x.id === id);
    console.log(id, 'idd');
    console.log(modibud, 'modicar');
    modibud.name = 'Modifica';
    modibud.limit = 1000;
    modibud.value = 223;
    reset();
    // setShowModal(!showModal);
    console.log(modibud, 'modicadooooo////');
  };

  const reset = () => {
    setLoading(false);
    setTimeout(() => setLoading(true), 1000);
  };
  const total = budgetData.reduce((acc, value) => acc + parseInt(value.value, 10), 0);
  // const setModalHandler = (e) => {
  //   e.preventDefault();
  //   setShowModal(!showModal);
  // };
  return (
    <div>
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
        <div className="col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Budget Name</th>

                <th scope="col">Amount</th>
                <th scope="col">Limit</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {loading &&
              budgetData &&
              budgetData.map((x) => (
                <>
                  <tbody>
                    <tr>
                      <th scope="row">{x.id}</th>
                      <td>{x.name}</td>
                      <td>${x.value}</td>
                      <td>${x.limit}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => modificateBud(x.id)}
                        >
                          <i className="fas fa-edit" />
                        </button>
                            
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteBud(x.id)}
                        >
                          <i className="far fa-trash-alt" />
                        </button>
                      </td>
                    </tr>{' '}
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
          <div clasNames="#collapse " id="collapseExample">
            <div className="card card-body ">
              <form>
                <div className="d-flex justify-content-center">
                  {' '}
                  <b> Budget Name </b>                              
                  <b> Budget Value </b>                              
                  <b> Budget Limit </b>
                </div>
                <div className="d-flex justify-content-center">
                  <input
                    placeholder="Title..."
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={newBudgets.name}
                  />
                    
                  <input
                    placeholder="Title..."
                    type="text"
                    name="value"
                    onChange={(e) => handleChange(e)}
                    value={newBudgets.value}
                  />
                    
                  <input
                    placeholder="Title..."
                    type="text"
                    name="limit"
                    onChange={(e) => handleChange(e)}
                    value={newBudgets.limit}
                  />
                     {' '}
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
