import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
/* eslint-disable consistent-return */
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../actions/frontoffice/creators';
import InternalLoader from '../loaders/InternalLoader';
import PdfPreview from '../pdfPreview/PdfPreview';
import Emptypage from '../../commons/FormDefault/Emptypage';

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('default');
  const [options, setOptions] = useState([]);
  const [send, setSend] = useState([]);
  const [switchSecond, setSwitchSecond] = useState(false);
  const [secondOptions, setSecondOptions] = useState([]);
  const [secondSelect, setSecondSelect] = useState([]);
  const [secondFilt, setSecondFilt] = useState(null);
  const movements = useSelector((state) => state.movementReducer.movements);
  const reports = useSelector((state) => state.reportReducer.reports);
  const user = useSelector((state) => state.authReducers.sessionData.loggedUser);

  // variables para hacer el filtrado
  const today = new Date();
  const month = today.getMonth() + 1;
  const realMonth = month < 10 ? '0'.concat(month) : month;

  function removeDuplicatesBy(keyFn, array) {
    const mySet = new Set();
    return array.filter((x) => {
      const key = keyFn(x);
      const isNew = !mySet.has(key);
      if (isNew) mySet.add(key);
      return isNew;
    });
  }
  // console.log('soy el reportsss', reports);

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
      setSwitchSecond(false);
      setSecondSelect([]);
    }
    setFilter(e.target.value);
    handleFilter(e.target.value);
  }

  function handleSend(e) {
    if (secondSelect.length > 0) {
      setSecondSelect([]);
      setSwitchSecond(false);
      setSecondFilt(null);
    }
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
    setSwitchSecond(false);
    setSecondFilt(null);
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
      // aca podriamos hacer el filter en data donde si el usuario es free deje solo las fechas del mes actual
      const newData =
        user.plan.name === 'Free' ? data.filter((d) => d.name.slice(5, 7) === realMonth) : data;
      const toType = removeDuplicatesBy((x) => x.name, newData);

      setOptions(toType);
    }
  }
  function downloadFilter(e) {
    e.preventDefault();
    action.getFilteredReports(send, dispatch);
    reset();
  }

  function secondFilter() {
    if (!secondFilt) {
      setSwitchSecond(true);
      if (filter === 'date') {
        setSecondOptions(['wallet', 'type']);
      }
      if (filter === 'wallet') {
        setSecondOptions(['type', 'date']);
      }
      if (filter === 'type') {
        setSecondOptions(['wallet', 'date']);
      }
    } else {
      document.getElementById('sel1').value = 'default';
      document.getElementById('myform').value = 'default';
      setSend([]);
      setSwitchSecond(false);
      setSecondSelect([]);
      setSecondFilt(null);
    }
  }
  function handleSecond(e) {
    if (secondSelect.length > 0) {
      document.getElementById('sel4').value = 'default';
    }
    setSecondFilt(e.target.value);
    const fltr = send[0].filt;
    if (fltr !== 'wallet_id') {
      if (e.target.value === 'type') {
        const data = movements
          .map((x) => {
            if (x[fltr] === send[0].value) {
              const { type } = x;
              return { name: type, value: type };
            }
          })
          .filter((x) => x !== undefined);
        const toType = removeDuplicatesBy((x) => x.name, data);
        setSecondSelect(toType);
      }
      if (e.target.value === 'wallet') {
        const data = movements
          .map((x) => {
            if (x[fltr] === send[0].value) {
              const {
                wallet, // eslint-disable-line camelcase
              } = x;
              return { name: wallet.name, value: wallet.id };
            }
          })
          .filter((x) => x !== undefined);
        const toType = removeDuplicatesBy((x) => x.name, data);
        setSecondSelect(toType);
      }
      if (e.target.value === 'date') {
        const data = movements
          .map((x) => {
            if (x[fltr] === send[0].value) {
              const {
                generation_date, // eslint-disable-line camelcase
              } = x;
              return { name: generation_date.slice(0, 10), value: generation_date };
            }
          })
          .filter((x) => x !== undefined);
        const newData =
          user.plan.name === 'Free' ? data.filter((d) => d.name.slice(5, 7) === realMonth) : data;
        const toType = removeDuplicatesBy((x) => x.name, newData);
        setSecondSelect(toType);
      }
    } else {
      if (e.target.value === 'type') {
        const data = movements
          .map((x) => {
            if (x.wallet.id === Number(send[0].value)) {
              const { type } = x;
              return { name: type, value: type };
            }
          })
          .filter((x) => x !== undefined);
        const toType = removeDuplicatesBy((x) => x.name, data);
        setSecondSelect(toType);
      }
      if (e.target.value === 'date') {
        const data = movements
          .map((x) => {
            if (x.wallet.id === Number(send[0].value)) {
              const {
                generation_date, // eslint-disable-line camelcase
              } = x;
              return { name: generation_date.slice(0, 10), value: generation_date };
            }
          })
          .filter((x) => x !== undefined);
        const newData =
          user.plan.name === 'Free' ? data.filter((d) => d.name.slice(5, 7) === realMonth) : data;
        const toType = removeDuplicatesBy((x) => x.name, newData);
        setSecondSelect(toType);
      }
    }
  }

  function handleFourth(e) {
    const obj = { wallet: 'wallet_id', date: 'generation_date', type: 'type' };
    if (send.length > 1) {
      setSend([send[0], { sec: obj[secondFilt], secVal: e.target.value }]);
    } else {
      setSend([...send, { sec: obj[secondFilt], secVal: e.target.value }]);
    }
  }

  return (
    <div>
      <div>
        <div className="bg-navy d-flex justify-content-between p-3 rounded-top">
          <h5>Download your movements reports </h5>
        </div>
        <div className="d-flex justify-content-center p-4">
          <button type="button" className="btn btn-warning" onClick={(e) => handleClick(e)}>
            <b> Download all movements</b>
          </button>

          <div className="d-flex card-header">
            <label className="p-1">Filter by: </label>
            <select
              className="p-2"
              name="select"
              className="mr-3"
              id="sel1"
              onChange={(e) => handleChange(e)}
              defaultValue="default"
            >
              <option value="default" disabled>
                None
              </option>
              {user.plan && user.plan.name === 'Free' ? (
                <>
                  <option value="date">Date</option>
                </>
              ) : (
                <>
                  <option value="type">Type</option>
                  <option value="date">Date</option>
                  <option value="wallet">Wallet</option>
                </>
              )}
            </select>
            {filter !== 'default' && (
              <>
                <label className="p-1">This {filter}:</label>
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
              className="btn bg-navy"
              onClick={(e) => downloadFilter(e)}
              disabled
            >
              <b>Download filtered by {filter}</b>
            </button>
          )}
        </div>
        <div className="d-flex justify-content-center p-4">
          {user.plan && user.plan.name !== 'Free' && send.length > 0 && (
            <button
              type="button"
              className={!secondFilt ? 'btn btn-warning mr-2' : 'btn btn-danger mr-2'}
              onClick={() => secondFilter()}
            >
              <b> {!secondFilt ? 'Add another filter' : 'Clear filter'} </b>
            </button>
          )}
          {switchSecond && (
            <select
              className="p-2"
              name="select"
              className="mr-3"
              id="sel3"
              onChange={(e) => handleSecond(e)}
              defaultValue="default"
            >
              <option value="default" disabled>
                None
              </option>
              {secondOptions.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          )}
          {secondSelect.length > 0 && (
            <>
              <label className="p-1">This {secondFilt}:</label>
              <select
                className="p-2"
                name="select"
                id="sel4"
                onChange={(e) => handleFourth(e)}
                defaultValue="default"
              >
                <option value="default" disabled>
                  Select
                </option>
                {options.length > 0 &&
                  secondSelect.map((e) => (
                    <option key={e.value} value={e.value}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </>
          )}
        </div>
      </div>
      {reports ? <PdfPreview reports={reports} /> : <Emptypage name="Reports" />}
      {!loading && <InternalLoader />}
    </div>
  );
}
