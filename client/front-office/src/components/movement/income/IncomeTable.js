import React, { useEffect } from 'react';
import IncomeModalEdit from './IncomeModalEdit';

const IncomeTable = ({ movements }) => (
  <div className="row">
    {console.log(movements.wallet)}
    <div className="col-12">
      <div className="card card-info">
        <div className="card-header">
          <h3 className="card-title">Movements</h3>
        </div>
        <div className="card-body table-responsive p-0">
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Generation Date</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {movements &&
                movements.slice(0, 10).map((m) => (
                  <tr>
                    <td>{m.description}</td>
                    <td className="text-success">$ +{m.amount}</td>
                    <td>{m.generation_date.replace('T', ' ~ ').replace('.000Z', ' ')}</td>
                    <td>{m.wallet.name}</td>
                    <td>
                      <IncomeModalEdit />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default IncomeTable;
