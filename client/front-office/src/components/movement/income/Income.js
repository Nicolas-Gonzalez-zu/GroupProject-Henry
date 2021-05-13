import React, { useEffect, useState } from 'react';
import { setIn, useFormik } from 'formik';
import IncomeTable from './IncomeTable';

export default function Income() {
  const [income, SetIncome] = useState({
    amount: '',
    generation_date: '',
    description: '',
  });
  const [error, setError] = useState({});
  const [errors, setErros] = useState(false);

  useEffect(() => {
    if (!/^[0-9]*$/gm.test(income.amount)) {
      setError({ ...error, amount: 'The amount must be a number' });
    } else if (!income.amount) {
      setError({ ...error, amount: 'The amount is required' });
    } else if (!income.generation_date) {
      setError({ ...error, generation_date: 'The generation date is required!' });
    } else if (!income.description) {
      setError({ ...error, description: 'the description is required' });
    }
  }, [income]);

  const onSubmitHandler = () => {
    if (
      income.amount.length < 0 ||
      income.generation_date.length < 0 ||
      income.description.length < 0
    ) {
      setErros(true);
    }
    setErros(false);
    alert(JSON.stringify(income, null, 2));
    return SetIncome({ amount: '', generation_date: '', description: '' });
  };
  const setIncomeHandler = (e) => {
    SetIncome({ ...income, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };
  const postMov = [
    {
      amount: 800,
      type: 'INCOME',
      generation_date: '2021-04-08 13:27:53.721-05',
      description: 'Soy el movimiento con transacción 4',
      wallet_id: 35,
      budget_id: 3,
    },
    {
      amount: 800,
      type: 'INCOME',
      generation_date: '2021-04-08 13:27:53.721-05',
      description: 'Soy el movimiento con transacción 5',
      wallet_id: 36,
      budget_id: 3,
    },
    {
      amount: 800,
      type: 'INCOME',
      generation_date: '2021-04-08 13:27:53.721-05',
      description: 'Soy el movimiento con transacción 6',
      wallet_id: 37,
      budget_id: 3,
    },
    {
      amount: 800,
      type: 'INCOME',
      generation_date: '2021-04-08 13:27:53.721-05',
      description: 'Soy el movimiento con transacción 7',
      wallet_id: 38,
      budget_id: 3,
    },
  ];
  return (
    <div className="card-body">
      <form onSubmit={onSubmitHandler}>
        <div className="row m-2">
          <div className="col-3">
            {error.amount ? (
              <p className="text-danger align-self-center">{error.amount}</p>
            ) : (
              <label className="align-self-center">amonut</label>
            )}
            <input
              type="text"
              className="form-control"
              placeholder="amount..."
              name="amount"
              value={income.amount}
              onChange={setIncomeHandler}
            />
          </div>
          <div className="col-3">
            {error.generation_date ? (
              <p className="text-danger align-self-center">{error.generation_date}</p>
            ) : (
              <label className="align-self-center">generation date</label>
            )}
            <input
              type="date"
              className="form-control"
              placeholder=".col-3"
              name="generation_date"
              value={income.generation_date}
              onChange={setIncomeHandler}
            />
          </div>
          <div className="col-5">
            {error.description ? (
              <p className="text-danger align-self-center">{error.description}</p>
            ) : (
              <label className="align-self-center">description</label>
            )}
            <input
              type="text"
              className="form-control"
              placeholder="description..."
              name="description"
              value={income.description}
              onChange={setIncomeHandler}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success align-self-end"
            style={{ height: '50%' }}
          >
            Add Movement
          </button>
        </div>
      </form>
      <div className="mt-3">
        <IncomeTable movements={postMov} />;
      </div>
    </div>
  );
}
