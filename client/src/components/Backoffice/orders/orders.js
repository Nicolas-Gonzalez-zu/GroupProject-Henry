import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderModal from './OrderEditModal';
import * as action from '../../../actions/backoffice/creators';

const status = [
  { id: 'pending', name: 'pending' },
  { id: 'done', name: 'done' },
  { id: 'inProgress', name: 'inProgress' },
];

const OrdersBO = () => {
  const orders = useSelector((state) => state.ordersBOReducer.orders);
  const employees = useSelector((state) => state.employeeBOReducer.employees);
  const dispatch = useDispatch();

  useEffect(() => {
    action.getOrders(dispatch);
    action.getEmployees(dispatch);
  }, [dispatch]);

  return (
    <div>
      <div className="card-header bg-dark mb-2">
        <h3>Orders</h3>
      </div>
      <div className="row p-2">
        {orders &&
          orders.map((o) => (
            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
              <div className="card bg-light d-flex flex-fill">
                <div className="card-header text-muted border-bottom-0">
                  <h2 className="lead">
                    <b>Order n° {o.id}</b>
                  </h2>
                </div>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-7">
                      <p className="text-muted text-sm mb-0">
                        Status:{' '}
                        {o.status === 'pending' ? (
                          <b className="text-warning">{o.status}</b>
                        ) : (
                          <b className="text-success">{o.status}</b>
                        )}
                      </p>
                      <p className="text-muted text-sm mb-0">
                        Priority:{' '}
                        <b>
                          {o.priority ? (
                            <span className="text-success">Success</span>
                          ) : (
                            <span className="text-danger">Low</span>
                          )}
                        </b>
                      </p>
                      <p className="text-muted text-sm mb-0">
                        Start date:
                        <b>{o.start_date && o.start_date.replace('T', '~').replace('.000Z', '')}</b>
                      </p>
                      <p className="text-muted text-sm mb-0">
                        End date:
                        <b>{o.end_date && o.end_date.replace('T', '~').replace('.000Z', '')}</b>
                      </p>
                      <ul className="ml-4 mb-0 fa-ul text-muted mt-3">
                        <li className="small">
                          <span className="fa-li">
                            <i className="fas fa-lg fa-envelope" />
                          </span>
                          E-mail: <b>{o.assigned_user.email}</b>
                        </li>
                        <li className="small mt-2">
                          <span className="fa-li">
                            <i className="fas fa-lg fa-phone" />
                          </span>
                          Phone: <b>{o.assigned_user.phone}</b>
                        </li>
                      </ul>
                    </div>
                    <div className="col-5 text-center">
                      <img
                        src="https://i.ibb.co/VSRq9tP/logo.png"
                        alt="user-avatar"
                        className="img-circle img-fluid"
                        height="50"
                      />
                      <p>{o.assigned_user.name}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <OrderModal
                    id={o.id}
                    users={employees}
                    status={status}
                    myStatus={o.status}
                    assignedUserBefore={o.assigned_user.name}
                    startDate={o.start_date}
                    endDate={o.end_date}
                    priority={o.priority}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrdersBO;
