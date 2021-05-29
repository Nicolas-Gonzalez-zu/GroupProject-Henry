import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import * as action from '../../actions/creators';

const Orders = () => {
  const orders = useSelector((state) => state.orderReducer.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    action.getOrders(dispatch);
  }, [dispatch]);

  const ordersAssigned = orders.filter((o) => o.status !== 'unassigned');

  const popover = (services) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Services</Popover.Title>
      <Popover.Content>
        {services.map((s) => (
          <p>
            <b> • {s.name}</b>
          </p>
        ))}
      </Popover.Content>
    </Popover>
  );

  const Newpopover = (name, phone, email) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{name} contact</Popover.Title>
      <Popover.Content>
        <p>
          Please send me an email to {email} in the chat below or call me to {phone}
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
                        Status: <b>{o.status}</b>
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
                          E-mail: {o.assigned_user.mail}
                        </li>
                        <li className="small mt-2">
                          <span className="fa-li">
                            <i className="fas fa-lg fa-phone" />
                          </span>
                          Phone: {o.assigned_user.phone}
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
                    {showServices(o.invoice.services)}
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
