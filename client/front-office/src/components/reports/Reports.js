import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';
import InternalLoader from '../loaders/InternalLoader';
import PdfPreview from '../pdfPreview/PdfPreview';
import Emptypage from '../FormDefault/Emptypage';

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
      <div>
        <div className="bg-dark d-flex justify-content-between p-3 rounded-top">
          <h5>Download your movements reports </h5>
        </div>
        <div className="d-flex justify-content-center p-4">
          <button type="button" className="btn btn-warning" onClick={(e) => handleClick(e)}>
            <b> Download all movements</b>
          </button>

          <div className="d-flex card-header">
            <label>Filter by: </label>
            <select
              className="p-2"
              name="select"
              className="mr-3"
              onChange={(e) => handleChange(e)}
              defaultValue="default"
            >
              <option value="default" disabled>
                None
              </option>
              <option value="type">Type</option>
              <option value="date">Date</option>
              <option value="wallet">Wallet</option>
            </select>
            {filter !== 'default' && (
              <>
                <label>This {filter}:</label>
                <select
                  className="p-2"
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
              </>
            )}
          </div>
          {send.length > 0 ? (
            <button type="button" className="btn btn-warning" onClick={(e) => downloadFilter(e)}>
              <b>Download filtered by {filter}</b>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-dark"
              onClick={(e) => downloadFilter(e)}
              disabled
            >
              <b>Download filtered by {filter}</b>
            </button>
          )}
        </div>
      </div>
      {reports ? <PdfPreview reports={reports} /> : <Emptypage name="Reports" />}
      {!loading && <InternalLoader />}
    </div>
  );
}
