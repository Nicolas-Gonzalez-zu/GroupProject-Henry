import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IncomeTable from './IncomeTable';
import IncomeModalMsj from './IncomeModalMsj';
import * as action from '../../../actions/creators';


const Income = () => {
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const dispatch = useDispatch();

  useEffect(() => {
    action.getWallet(dispatch);
  }, [dispatch]);
  const [income, SetIncome] = useState({
    amount: '',
    generation_date: '',
    description: '',
    type: 'INCOME',
    wallet_id: '',
  });
  const [incomes, setIncomes] = useState([]);
  const [error, setError] = useState({});
  const [errors, setErros] = useState(false);
  const [showIncomeMsj, setShowIncomeMsj] = useState(false);

  useEffect(() => {
    if (!/^[0-9]*$/gm.test(income.amount)) {
      setError({ ...error, amount: 'The amount must be a number' });
    } else if (!income.amount) {
      setError({ ...error, amount: 'The amount is required' });
    } else if (income.wallet_id === '-') {
      setError({ ...error, wallet_id: 'the income destination is required' });
    } else if (!income.generation_date) {
      setError({ ...error, generation_date: 'The generation date is required!' });
    } else if (!income.description) {
      setError({ ...error, description: 'the description is required' });
    }
  }, [income]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      error.amount.length > 0 ||
      error.generation_date.length > 0 ||
      error.description.length > 0 ||
      error.wallet_id.length > 0
    ) {
      setErros(true);
      return setShowIncomeMsj(!showIncomeMsj);
    }
    setErros(false);
    setShowIncomeMsj(!showIncomeMsj);
    setIncomes([...incomes, income]);
    return SetIncome({ amount: '', generation_date: '', description: '', wallet_id: '' });
  };
  const setIncomeHandler = (e) => {
    SetIncome({ ...income, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: '' });
  };

  return (
    <div className="d-flex flex-column">
      <div className="card card-success align-self-center" style={{ width: '40%' }}>
        <div className="card-header">
          <h3 className="card-title">Add your income</h3>
        </div>

        <form className="form-horizontal" onSubmit={onSubmitHandler}>
          <div className="card-body">
            <div className="form-group row">
              <label htmlFor="inputEmail3" className="col-3 col-form-label">
                Amount
              </label>
              <div className="col-5">
                <input
                  type="text"
                  className={error.amount ? 'form-control is-invalid' : 'form-control'}
                  name="amount"
                  value={income.amount}
                  onChange={setIncomeHandler}
                  placeholder="Amount..."
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-3 col-form-label">
                Generation Date
              </label>
              <div className="col-5">
                <input
                  type="datetime-local"
                  className={error.generation_date ? 'form-control is-invalid' : 'form-control'}
                  placeholder=".col-3"
                  name="generation_date"
                  value={income.generation_date}
                  onChange={setIncomeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-3 col-form-label">
                To
              </label>
              <div className="col-5">
                <select
                  className="custom-select"
                  name="wallet_id"
                  onChange={setIncomeHandler}
                  className={error.wallet_id ? 'form-control is-invalid' : 'form-control'}
                >
                  <option selected>-</option>
                  {wallets && wallets.map((w) => <option value={w.id}>{w.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-3 col-form-label">
                Description
              </label>
              <div className="col-5">
                <input
                  type="text"
                  className={error.description ? 'form-control is-invalid' : 'form-control'}
                  placeholder="description..."
                  name="description"
                  value={income.description}
                  onChange={setIncomeHandler}
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <IncomeModalMsj
              errors={errors}
              setShowIncomeMsj={setShowIncomeMsj}
              onSubmitHandler={onSubmitHandler}
              showIncomeMsj={showIncomeMsj}
            />
          </div>
        </form>
      </div>
      <div className="">
        <IncomeTable movements={incomes} wallets={wallets} />
      </div>
    </div>
  );
};
export default Income;

