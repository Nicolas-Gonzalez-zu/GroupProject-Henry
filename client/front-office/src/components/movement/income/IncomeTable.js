import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../actions/creators';

const IncomeTable = ({ movements }) => {
  const wallets = useSelector((state) => state.walletReducer.wallets);
  const dispatch = useDispatch();
  useEffect(() => {
    action.getWallet(dispatch);
  }, [dispatch]);

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Movements</h3>
            {console.log(wallets)}
            <div className="card-tools">
              <div className="input-group input-group-sm" style={{ width: '150px;' }}>
                <div className="input-group-append">
                  <button type="submit" className="btn btn-default">
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body table-responsive p-0">
            <table className="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {movements &&
                  movements.map((m) => (
                    <tr>
                      <td>{m.description}</td>
                      <td>$ {m.amount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IncomeTable;
