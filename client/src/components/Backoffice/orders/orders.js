import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import OrderModal from './OrderEditModal';
import * as action from '../../../actions/backoffice/creators';
import { status, statusColors } from '../../../utils/ordersStatus';

const OrdersBO = () => {
  const orders = useSelector((state) => state.ordersBOReducer.orders);
  const employees = useSelector((state) => state.employeeBOReducer.employees);
  const dispatch = useDispatch();
  const [sortDate, setSortDate] = useState('');
  const [sortStatus, setSortStatus] = useState('');
  const [sortPriority, setSortPriority] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const orderPerPage = 9;
  const pagesVisited = pageNumber * orderPerPage;
  const pageCount = Math.ceil(orders?.length / orderPerPage);

  useEffect(() => {
    action.getOrders(dispatch);
    action.getEmployees(dispatch);
  }, [dispatch]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayOrders = orders?.slice(pagesVisited, pagesVisited + orderPerPage).map((o) => (
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
                Status:
                <b className={`text-${statusColors[o.status]}`}>{o.status}</b>
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
            myStatus={o.status}
            assignedUserBefore={o.assigned_user.name}
            startDate={o.start_date}
            endDate={o.end_date}
            priority={o.priority}
          />
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    if (sortDate === 'startDate') {
      return action.sortOrdersByDate(dispatch);
    }
    if (sortDate === 'lastStartDate') {
      return action.sortOrdersByDateReverse(dispatch);
    }

    return action.getOrders(dispatch);
  }, [sortDate, dispatch]);

  useEffect(() => {
    if (sortStatus !== 'all') {
      return action.sortOrdersByStatus(sortStatus, dispatch);
    }
    return action.getOrders(dispatch);
  }, [sortStatus, dispatch]);

  useEffect(() => {
    if (sortPriority === 'high') {
      return action.sortOrdersByPriority(dispatch);
    }
    if (sortPriority === 'low') {
      return action.sortOrdersByPriorityLow(dispatch);
    }
    return action.getOrders(dispatch);
  }, [sortPriority, dispatch]);

  return (
    <div>
      <div className="card-header bg-dark mb-2">
        <h3>Orders</h3>
      </div>
      <div className="column">
        <div className="row p-3 d-flex justify-content-between">
          <div className=" d-flex justify-content-center w-25">
            <h4>Sort by:</h4>
          </div>
          <div className="w-75 d-flex align-items-center justify-content-around">
            <div>
              <label>Date</label>
              <select onChange={(e) => setSortDate(e.target.value)}>
                <option value="all">Default</option>
                <option value="startDate">Start date</option>
                <option value="lastStartDate">Last Start Date</option>
              </select>
            </div>
            <div>
              <label>Status</label>
              <select onChange={(e) => setSortStatus(e.target.value)}>
                <option value="all">-</option>
                {status && status.map((s) => <option value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label>Priority</label>
              <select onChange={(e) => setSortPriority(e.target.value)}>
                <option value="all">-</option>
                <option value="high">High</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row p-2">
          {orders && displayOrders}
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginationBttns"
            previousLinkClassName="previousBttn"
            nextLinkClassName="nextBttn"
            disabledClassName="paginationDisabled"
            activeClassName="paginationActive"
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersBO;
