import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../actions/frontoffice/creators';
import Emptypage from '../../commons/FormDefault/Emptypage';
import InternalLoader from '../loaders/InternalLoader';
import ExpenseModal from './ExpenseModal';
import ExpenseModalEdit from './ExpenseModalEdit';

export default function Expense() {
  const [loading, setLoading] = useState(true);
  const movements = useSelector((state) => state.movementReducer.movements);
  const filterMovement = movements.filter((x) => x.type === 'OUTGO');

  const dispatch = useDispatch();

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  };

  useEffect(() => {
    action.getMovements(dispatch);
    reset();
  }, [dispatch]);

  return (
    <>
      {!loading && <InternalLoader />}
      <div className="card">
        <div className="bg-navy d-flex justify-content-between w-100 p-2 rounded-top">
          <h3>Movements - Expense</h3>
          <ExpenseModal />
        </div>
      </div>
      <div className="card-body">
        <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4">
          <div className="row">
            <div className="col-sm-12 col-md-6" />
            <div className="col-sm-12 col-md-6" />
          </div>

          <div className="row">
            <div className="col-sm-12">
              {filterMovement.length === 0 ? (
                <Emptypage name="Expenses" />
              ) : (
                <table
                  id="example2"
                  className="table table-bordered table-hover dataTable dtr-inline"
                  role="grid"
                  aria-describedby="example2_info"
                >
                  <thead>
                    <tr role="row">
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="Rendering engine: activate to sort column ascending"
                      >
                        <b>ID</b>
                      </th>
                      <th
                        className="sorting sorting_desc"
                        aria-controls="example2"
                        aria-label="Browser: activate to sort column ascending"
                        aria-sort="descending"
                      >
                        Amount
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="Platform(s): activate to sort column ascending"
                      >
                        Description
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="Engine version: activate to sort column ascending"
                      >
                        Wallet
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="Engine version: activate to sort column ascending"
                      >
                        Budget
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="CSS grade: activate to sort column ascending"
                      >
                        Date
                      </th>
                      <th
                        className="sorting"
                        aria-controls="example2"
                        aria-label="CSS grade: activate to sort column ascending"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {filterMovement &&
                    filterMovement.slice(0, 7).map((x) => (
                      <tbody>
                        <tr key={x.id}>
                          <td className="dtr-control">{x.id}</td>
                          <td className="sorting_1 text-danger">$ -{x.amount}.00</td>
                          <td>{x.description}</td>
                          <td>
                            {x.wallet.name}
                            <br /> <span className="text-olive">$ {x.wallet.balance}.00</span>
                          </td>
                          <td>
                            <span className="text-center">{x.budget.name}</span>
                            <br /> <span className="text-info">$ {x.budget.amount}</span>
                          </td>
                          {console.log(x.generation_date, 'date nueva')}
                          <td>{x.generation_date.replace('T', ' ~ ').replace('.000Z', ' ')}</td>
                          <td className="text-center">
                            <ExpenseModalEdit
                              id={x.id}
                              description={x.description}
                              date={x.generation_date}
                            />
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
