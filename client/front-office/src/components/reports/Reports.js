import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

export default function Reports() {
  const [filter, setFilter] = useState('default');
  const [options, setOptions] = useState([]);
  const movements = useSelector((state) => state.movementReducer.movements);

  const toType = movements
    .map((x) => x.type)
    .reduce((newTempArr, el) => (newTempArr.includes(el) ? newTempArr : [...newTempArr, el]), []);
  const toDate = movements
    .map((x) => x.generation_date.slice(0, 10))
    .reduce((newTempArr, el) => (newTempArr.includes(el) ? newTempArr : [...newTempArr, el]), []);
  const toWallet = movements
    .map((x) => x.wallet.name)
    .reduce((newTempArr, el) => (newTempArr.includes(el) ? newTempArr : [...newTempArr, el]), []);

  const dispatch = useDispatch();

  useEffect(() => {
    action.getMovements(dispatch);
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    action.getAllReports(dispatch);
  }

  function handleChange(e) {
    setFilter(e.target.value);
    if (e.target.value === 'type') {
      setOptions(toType);
    }
    if (e.target.value === 'date') {
      setOptions(toDate);
    }
    if (e.target.value === 'wallet') {
      setOptions(toWallet);
    }
  }

  return (
    <div>
      <div className="bg-warning d-flex justify-content-between w-100 p-3 rounded-top">
        <h5>Download your movements reports </h5>
      </div>
      <div className="d-flex w-100 justify-content-center p-4">
        <button
          type="button"
          className="btn btn-block btn-info btn-xs w-50"
          onClick={(e) => handleClick(e)}
        >
          <h5>Download all movements</h5>
        </button>
      </div>
      <div className="d-flex justify-content-center">Or</div>
      <div className="d-flex justify-content-center p-3">
        <label>Filter by:</label>
        <select name="select" onChange={(e) => handleChange(e)} defaultValue="default">
          <option value="default" disabled>
            None
          </option>
          <option value="type">Type</option>
          <option value="date">Date</option>
          <option value="wallet">Wallet</option>
        </select>
      </div>
      {filter !== 'default' && (
        <div className="d-flex justify-content-center p-3">
          <label>This {filter}:</label>
          <select name="select" onChange={(e) => handleChange(e)}>
            {options.length > 0 && options.map((e) => <option>{e}</option>)}
          </select>
        </div>
      )}
      {filter !== 'default' && (
        <div className="d-flex w-100 justify-content-center p-1">
          <button type="button" className="btn btn-block btn-info btn-xs w-25">
            <h6>Download filtered by {filter}</h6>
          </button>
        </div>
      )}
    </div>
  );
}
