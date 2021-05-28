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

  console.log(orders);
  const ordersAssigned = orders.filter((o) => o.status !== 'unassigned');

  const popover = (services) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Services</Popover.Title>
      <Popover.Content>
        {/* {orders.invoice.services && orders.invoice.services.map((s) => <p>{s.name}</p>)} */}
        {services.map((s) => (
          <p>
            <b> • {s.name}</b>
          </p>
        ))}
      </Popover.Content>
    </Popover>
  );

  const showServices = (services) => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover(services)}>
      <Button variant="success">See services</Button>
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
                    <a href="#" className="btn btn-sm bg-teal">
                      <i className="fas fa-comments" />
                    </a>
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
// <>
//
// {orders &&
// orders.map((o) => (
//   <>
//     <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column mt-3">
//       <div className="card bg-light d-flex flex-fill">
//         <div className="card-header text-muted border-bottom-0">Order n°{orders.id}</div>
//         <div className="card-body pt-0">
//           <div className="row">
//             <div className="col-7">
//               <h2 className="lead">
//                 <b>Nicole Pearson</b>
//               </h2>
//               <p className="text-muted text-sm">
//                 <b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover{' '}
//               </p>
//               <ul className="ml-4 mb-0 fa-ul text-muted">
//                 <li className="small">
//                   <span className="fa-li">
//                     <i className="fas fa-lg fa-building" />
//                   </span>{' '}
//                   Address: Demo Street 123, Demo City 04312, NJ
//                 </li>
//                 <li className="small">
//                   <span className="fa-li">
//                     <i className="fas fa-lg fa-phone" />
//                   </span>
//                   Phone #: + 800 - 12 12 23 52
//                 </li>
//               </ul>
//             </div>
//             <div className="col-5 text-center">
//               <img
//                 src="../../dist/img/user1-128x128.jpg"
//                 alt="user-avatar"
//                 className="img-circle img-fluid"
//               />
//             </div>
//           </div>
//         </div>
//         {/* <div className="card-footer">
//         <div className="text-right">
//           <a href="#" className="btn btn-sm bg-teal">
//             <i className="fas fa-comments" />
//           </a>
//           <a href="#" className="btn btn-sm btn-primary">
//             <i className="fas fa-user" /> View Profile
//           </a>
//         </div>
//       </div> */}
//       </div>

// </div>
//   </>
