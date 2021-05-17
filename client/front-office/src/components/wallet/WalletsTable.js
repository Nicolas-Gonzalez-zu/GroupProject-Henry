import React from 'react';
import { useDispatch } from 'react-redux';
import * as action from '../../actions/creators';
import WalletModalEdit from './WalletModalEdit';

const WalletTable = ({ wallets }) => {
  const dispatch = useDispatch();
  const setHandler = (id, status) => {
    const newData = { id, status: !status };
    console.log(newData);
    console.log(wallets);
    action.changeWalletStatus(newData, dispatch);
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Balance</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {wallets &&
          wallets.map((w, i) => (
            <tr>
              <td>{w.name}</td>
              <td>${w.balance}</td>
              <td>
                {w.status ? (
                  <p className="text-success">
                    <b>available</b>
                  </p>
                ) : (
                  <p className="text-danger">
                    <b>disable</b>
                  </p>
                )}
              </td>
              <td className="text-right py-0 align-middle justify-content-between">
                <div className="btn-group btn-group-sm">
                  {w.status ? (
                    <div className="d-flex">
                      <WalletModalEdit id={w.id} name={w.name} balance={w.balance} />
                      <button
                        type="button"
                        className="btn btn-danger ml-2"
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
                      className="btn btn-success"
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
