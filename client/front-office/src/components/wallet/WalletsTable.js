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
          <th>id</th>
          <th>Name</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {wallets &&
          wallets.map((w, i) => (
            <tr>
              <td>{w.id}</td>
              <td>{w.name}</td>
              <td>${w.balance}</td>
              <td>
                {w.status ? (
                  <p className="text-success">available</p>
                ) : (
                  <p className="text-danger">disable</p>
                )}
              </td>
              <td className="text-right py-0 align-middle justify-content-between">
                <div className="btn-group btn-group-sm">
                  <WalletModalEdit id={w.id} />
                  {w.status ? (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        setHandler(w.id, w.status);
                      }}
                    >
                      <i className="fas fa-trash" />
                    </button>
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
