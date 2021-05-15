import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';
import MovementsModal from './MovementsModal';
import MovementModalEdit from './MovementModalEdit';

export default function Movement() {
  const movements = useSelector((state) => state.movementReducer.movements);
  const filterMovement = movements.filter((x) => x.type === 'OUTGO');

  const dispatch = useDispatch();

  useEffect(() => {
    action.getMovements(dispatch);
  }, [dispatch]);

  return (
    <>
      <div className="card">
        <div className="bg-warning d-flex justify-content-between w-100 p-3 rounded-top">
          <h3>~ Register your expenses </h3>
          <MovementsModal />
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
                      aria-label="CSS grade: activate to sort column ascending"
                    >
                      Consume in Budget
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
                    <>
                      <tbody>
                        <tr className="odd">
                          <td className="dtr-control">{x.id}</td>
                          <td className="sorting_1 text-danger">$ -{x.amount}.00</td>
                          <td>{x.description}</td>
                          <td>
                            {x.wallet.name}
                            <br /> <span className="text-info">$ {x.wallet.balance}.00</span>
                          </td>
                          <td>
                            <p className="text-center">{x.budget.name}</p>
                            <div className="progress progress-xs">
                              <div
                                className="progress-bar bg-purple"
                                style={{
                                  width: `${(30 / x.wallet.balance) * 100}%`,
                                }}
                              />
                            </div>
                          </td>
                          <td>{x.generation_date.replace('T', ' ~ ').replace('.000Z', ' ')}</td>
                          <td className="text-center">
                            <MovementModalEdit
                              id={x.id}
                              description={x.description}
                              date={x.generation_date}
                            />
                            <td>
                              <p className="text-center">{x.budget.name}</p>
                              <div className="progress progress-xs">
                                <div
                                  className="progress-bar bg-purple"
                                  style={{
                                    width: `${(x.budget.amount / x.wallet.balance) * 100}%`,
                                  }}
                                />
                              </div>
                            </td>
                            <td>{x.generation_date.replace('T', ' ~ ').replace('.000Z', ' ')}</td>
                            <td className="text-center">
                              <MovementModalEdit
                                id={x.id}
                                description={x.description}
                                date={x.generation_date}
                              />
                            </td>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
