import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';
import InternalLoader from '../loaders/InternalLoader';

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('default');
  const [options, setOptions] = useState([]);
  const [send, setSend] = useState([]);
  const movements = useSelector((state) => state.movementReducer.movements);
  const reports = useSelector((state) => state.reportReducer.reports);

  function removeDuplicatesBy(keyFn, array) {
    const mySet = new Set();
    return array.filter((x) => {
      const key = keyFn(x);
      const isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    action.getMovements(dispatch);
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    action.getAllReports(dispatch);
    reset();
  }

  function handleChange(e) {
    if (filter !== 'default') {
      document.getElementById('myform').value = 'default';
      setSend([]);
    }
    setFilter(e.target.value);
    handleFilter(e.target.value);
  }

  function handleSend(e) {
    if (filter === 'type') {
      setSend([
        {
          filt: 'type',
          value: e.target.value,
        },
      ]);
    }
    if (filter === 'wallet') {
      setSend([
        {
          filt: 'wallet_id',
          value: e.target.value,
        },
      ]);
    }
    if (filter === 'date') {
      setSend([
        {
          filt: 'generation_date',
          value: e.target.value,
        },
      ]);
    }
  }

  function handleFilter(prop) {
    if (prop === 'type') {
      const data = movements.map((x) => {
        const { type } = x;
        return { name: type, value: type };
      });
      const toType = removeDuplicatesBy((x) => x.name, data);
      setOptions(toType);
    }
    if (prop === 'wallet') {
      const data = movements.map((x) => {
        const {
          wallet, // eslint-disable-line camelcase
        } = x;
        return { name: wallet.name, value: wallet.id };
      });
      const toType = removeDuplicatesBy((x) => x.name, data);
      setOptions(toType);
    }
    if (prop === 'date') {
      const data = movements.map((x) => {
        const {
          generation_date, // eslint-disable-line camelcase
        } = x;
        return { name: generation_date.slice(0, 10), value: generation_date };
      });
      const toType = removeDuplicatesBy((x) => x.name, data);
      setOptions(toType);
    }
  }
  function downloadFilter(e) {
    e.preventDefault();
    action.getFilteredReports(send[0], dispatch);
    reset();
  }

  return (
    <div>
      {reports && <Redirect to={{ pathname: '/preview', state: { reports } }} />}
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
            <select
              name="select"
              id="myform"
              onChange={(e) => handleSend(e)}
              defaultValue="default"
            >
              <option value="default" disabled>
                Select
              </option>
              {options.length > 0 &&
                options.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.name}
                  </option>
                ))}
            </select>
          </div>
        )}
        {send.length > 0 && (
          <div className="d-flex w-100 justify-content-center p-1">
            <button
              type="button"
              className="btn btn-block btn-info btn-xs w-25"
              onClick={(e) => downloadFilter(e)}
            >
              <h6>Download filtered by {filter}</h6>
            </button>
          </div>
        )}
      </div>
      {!loading && <InternalLoader />}
    </div>
  );
}
