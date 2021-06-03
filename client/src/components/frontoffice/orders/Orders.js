import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import * as action from '../../../actions/frontoffice/creators';

const Orders = () => {
  const [sort, setSort] = useState('');
  const orders = useSelector((state) => state.orderReducer.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    action.getOrders(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (sort !== 'all' && sort !== 'startDate') {
      return action.sortOrdersStatus(sort, dispatch);
    }
    if (sort === 'startDate') {
      return action.sortOrdersByDate(dispatch);
    }
    return action.getOrders(dispatch);
  }, [sort, dispatch]);

  const status = [
    { id: 'unassigned', name: 'unassigned' },
    { id: 'pending', name: 'pending' },
    { id: 'done', name: 'done' },
    { id: 'inProgress', name: 'inProgress' },
  ];

  const popover = (services) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Services</Popover.Title>
      <Popover.Content>
        {services?.map((s) => (
          <p>
            <b> • {s.name}</b>
          </p>
        ))}
      </Popover.Content>
    </Popover>
  );

  const Newpopover = (name, phone, email) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">contact {name}!</Popover.Title>
      <Popover.Content>
        <p>
          Please send me an email to <b>{email}</b> in the chat below or call me to {phone}
        </p>
        <p>
          <b>Thank you!</b>
        </p>
      </Popover.Content>
    </Popover>
  );
  const showServices = (services) => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover(services)}>
      <Button variant="info">See services</Button>
    </OverlayTrigger>
  );

  const showContact = (name, phone, email) => (
    <OverlayTrigger trigger="click" placement="right" overlay={Newpopover(name, phone, email)}>
      <Button variant="success">Contact</Button>
    </OverlayTrigger>
  );

  const ordersFiltered = orders.filter((o) => o.status !== 'unassigned');
  const ordersUnassigned = orders.filter((o) => o.status === 'unassigned');
  const handleChange = (e) => {
    setSort(e.target.value);
  };
  return (
    <div>
      <div className="card-header bg-dark mb-2">
        <div className="d-flex justify-content-between">
          <h3>Orders</h3>
          {ordersUnassigned.length ? (
            <h4>
              Awaiting for: <b className="text-danger">{ordersUnassigned.length} orders</b>
            </h4>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="column">
        <div className="row p-3 d-flex justify-content-between">
          <div className=" d-flex justify-content-center w-25">
            <h4>Sort by:</h4>
          </div>
          <div className="w-75 d-flex align-items-center justify-content-around">
            <div>
              <label>Date</label>
              <select onChange={handleChange}>
                <option value="all">Default</option>
                <option value="startDate">Start date</option>
              </select>
            </div>
            <div>
              <label>Status</label>
              <select onChange={handleChange}>
                <option value="all">-</option>
                {status && status.map((s) => <option value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="row p-2 mr-0">
          {ordersFiltered &&
            ordersFiltered.map((o) => (
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
                          Start date: <b>{o.start_date.replace('T', '~').replace('.000Z', ' ')}</b>
                        </p>
                        <p className="text-muted text-sm mb-0">
                          End date: <b>{o.end_date.replace('T', '~').replace('.000Z', ' ')}</b>
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
                    <div className="d-flex justify-content-between">
                      {showContact(
                        o.assigned_user.name,
                        o.assigned_user.phone,
                        o.assigned_user.email,
                      )}
                      {showServices(o.invoice?.services)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
