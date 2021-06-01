import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderModal from './OrderEditModal';

const fakeOrders = [
  {
    id: 6,
    status: 'unassigned',
    priority: false,
    start_date: null,
    end_date: null,
    assigned_user_id: null,
    assigned_user: {},
    invoice_id: 59,
    invoice: {
      id: 59,
      payment_method: 'mercado pago',
      amount: '80965.13',
      status: 'completed',
      services: [
        {
          id: 1,
          name: 'Savings Account',
          price: '52471.89',
        },
        {
          id: 2,
          name: 'Auto Loan Account',
          price: '48126.40',
        },
        {
          id: 3,
          name: 'Money Market Account',
          price: '608.12',
        },
      ],
    },
  },
  {
    id: 8,
    status: 'unassigned',
    priority: false,
    start_date: null,
    end_date: null,
    assigned_user_id: null,
    assigned_user: {},
    invoice_id: 61,
    invoice: {
      id: 61,
      payment_method: 'mercado pago',
      amount: '41977.51',
      status: 'completed',
      services: [
        {
          id: 1,
          name: 'Savings Account',
          price: '52471.89',
        },
      ],
    },
  },
  {
    id: 10,
    status: 'unassigned',
    priority: false,
    start_date: null,
    end_date: null,
    assigned_user_id: null,
    assigned_user: {},
    invoice_id: 208,
    invoice: {
      id: 208,
      payment_method: 'mercado pago',
      amount: '53941.12',
      status: 'completed',
      services: [
        {
          id: 2,
          name: 'Auto Loan Account',
          price: '48126.40',
        },
        {
          id: 5,
          name: 'Credit Card Account',
          price: '19300.00',
        },
      ],
    },
  },
  {
    id: 11,
    status: 'unassigned',
    priority: false,
    start_date: null,
    end_date: null,
    assigned_user_id: null,
    assigned_user: {},
    invoice_id: 209,
    invoice: {
      id: 209,
      payment_method: 'mercado pago',
      amount: '53941.12',
      status: 'completed',
      services: [
        {
          id: 2,
          name: 'Auto Loan Account',
          price: '48126.40',
        },
        {
          id: 5,
          name: 'Credit Card Account',
          price: '19300.00',
        },
      ],
    },
  },
];

const users = [
  { id: 1, name: 'nacho garay' },
  { id: 2, name: 'Joaquin Bianchi' },
  { id: 3, name: 'nico gonzalez' },
];
const status = [
  { id: 'pending', name: 'pending' },
  { id: 'done', name: 'done' },
  { id: 'inProgress', name: 'inProgress' },
];

const OrdersBO = () => {
  const orders = useSelector((state) => state.ordersBOReducer.orders);
  console.log(orders);
  return (
    <div>
      <div className="card-header bg-dark mb-2">
        <h3>Orders</h3>
      </div>
      <div className="row p-2">
        {fakeOrders &&
          fakeOrders.map((o) => (
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
                        Start date: <b>{o.start_date}</b>
                      </p>
                      <p className="text-muted text-sm mb-0">
                        End date: <b>{o.end_date}</b>
                      </p>
                      <ul className="ml-4 mb-0 fa-ul text-muted mt-3">
                        <li className="small">
                          <span className="fa-li">
                            <i className="fas fa-lg fa-envelope" />
                          </span>
                          E-mail: <b>{o.assigned_user.mail}</b>
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
                    users={users}
                    status={status}
                    myStatus={o.status}
                    assignedUser={o.assigned_user}
                    startDate={o.start_date}
                    endDate={o.end_date}
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
