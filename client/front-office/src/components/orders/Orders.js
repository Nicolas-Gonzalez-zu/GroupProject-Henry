// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import * as action from '../../actions/creators';

// // export default function Orders() {
// //   return (
// //     <div className="container-fluid d-flex justify-content-center p-3 mt-5">
// //       <img
// //         className="col-5"
// //         src="https://www.ccisua.org/wp-content/uploads/2017/05/fa-work-in-progress-computer.png"
// //       />
// //     </div>
// //   );
// // }
// const Orders = () => {
//   const orders = useSelector((state) => state.orderReducer.orders);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     action.getOrders(dispatch);
//   }, [dispatch]);

//   return (
//     <div className="card-header bg-dark">
//           <h3>Orders</h3>
//       </div>
//     {orders &&
//     orders.map((o) => (
//       <>
//         <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column mt-3">
//           <div className="card bg-light d-flex flex-fill">
//             <div className="card-header text-muted border-bottom-0">Order n°{orders.id}</div>
//             <div className="card-body pt-0">
//               <div className="row">
//                 <div className="col-7">
//                   <h2 className="lead">
//                     <b>Nicole Pearson</b>
//                   </h2>
//                   <p className="text-muted text-sm">
//                     <b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover{' '}
//                   </p>
//                   <ul className="ml-4 mb-0 fa-ul text-muted">
//                     <li className="small">
//                       <span className="fa-li">
//                         <i className="fas fa-lg fa-building" />
//                       </span>{' '}
//                       Address: Demo Street 123, Demo City 04312, NJ
//                     </li>
//                     <li className="small">
//                       <span className="fa-li">
//                         <i className="fas fa-lg fa-phone" />
//                       </span>
//                       Phone #: + 800 - 12 12 23 52
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="col-5 text-center">
//                   <img
//                     src="../../dist/img/user1-128x128.jpg"
//                     alt="user-avatar"
//                     className="img-circle img-fluid"
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* <div className="card-footer">
//             <div className="text-right">
//               <a href="#" className="btn btn-sm bg-teal">
//                 <i className="fas fa-comments" />
//               </a>
//               <a href="#" className="btn btn-sm btn-primary">
//                 <i className="fas fa-user" /> View Profile
//               </a>
//             </div>
//           </div> */}
//           </div>
//       </>
//     ))
//     </div>

// };

// export default Orders;
