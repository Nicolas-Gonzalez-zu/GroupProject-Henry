import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../actions/creators';
import WalletModalEdit from './WalletModalEdit';

const WalletTable = () => {
  const [sort, setOrder] = useState('');
  const dispatch = useDispatch();
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const setHandler = (id, status) => {
    const newData = { id, status: !status };
    console.log(newData);
    console.log(wallets);
    action.changeWalletStatus(newData, dispatch);
  };

  useEffect(() => {
    console.log(sort);
    if (sort === 'A-Z') {
      console.log('entre a az');
      action.sortWalletsAZ(dispatch);
    }
    if (sort === 'Z-A') {
      console.log('entre a za');
      action.sortWalletZA(dispatch);
    }
    if (sort === '+ balance') {
      console.log('entre aca');
      action.sortWalletBalance(dispatch);
    }
    if (sort === '- balance') {
      action.sortWalletMinBalance(dispatch);
    }
    if (sort === 'all') {
      action.getWallet(dispatch);
    }
  }, [sort, dispatch]);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <div className="d-flex">
              <h5 className="mr-4">
                <b>Name</b>
              </h5>
              <select onChange={(e) => setOrder(e.target.value)}>
                <option value="all" selected>
                  all
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
            </div>
          </th>
          <th>
            <div className="d-flex">
              <h5 className="mr-4">
                <b>Balance</b>
              </h5>
              <select onChange={(e) => setOrder(e.target.value)}>
                <option value="all" selected>
                  all
                </option>
                <option value="+ balance">+ balance</option>
                <option value="- balance">- balance</option>
              </select>
            </div>
          </th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {wallets &&
          wallets.slice(0, 10).map((w, i) => (
            <tr>
              <td>{w.name}</td>
              <td>$ {w.balance}.00</td>
              <td>
                {w.status ? (
                  <p className="text-success">
                    <b>Available</b>
                  </p>
                ) : (
                  <p className="text-danger">
                    <b>Disable</b>
                  </p>
                )}
              </td>
              <td className="text-right py-0 align-middle justify-content-between">
                <div className="btn-group btn-group-sm">
                  {w.status ? (
                    <div className="d-flex">
                      <WalletModalEdit id={w.id} nameBefore={w.name} balance={w.balance} />
                      <button
                        type="button"
                        className="btn bg-gradient-danger ml-2"
                        onClick={() => {
                          setHandler(w.id, w.status);
                        }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn bg-gradient-success"
                      onClick={() => {
                        setHandler(w.id, w.status);
                      }}
                    >
                      <i className="fas fa-check" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default WalletTable;
