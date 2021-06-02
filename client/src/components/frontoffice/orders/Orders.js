import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import * as action from '../../../actions/frontoffice/creators';

const Orders = () => {
  const orders = useSelector((state) => state.orderReducer.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    action.getOrders(dispatch);
  }, [dispatch]);

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

  return (
    <div>
      <div className="card-header bg-dark mb-2">
        <h3>Orders</h3>
      </div>
      <div className="row p-2">
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
                  <div className="d-flex justify-content-between">
                    {showContact(o.assigned_user.name, o.assigned_user.phone, o.assigned_user.mail)}
                    {showServices(o.invoice?.services)}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
