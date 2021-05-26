import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import InternalLoader from '../../loaders/InternalLoader';
import * as action from '../../../actions/creators';
import './Invoices.css';

export default function Invoices() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoiceReducer.invoices);
  const [pageNumber, setPageNumber] = useState(0);
  const invoicePerPage = 10;
  const pagesVisited = pageNumber * invoicePerPage;

  useEffect(() => {
    action.getInvoices(dispatch);
    reset();
  }, [dispatch]);

  function getInvoice(e) {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 3000);
    action.getInvoice(e, dispatch);
  }

  const pageCount = Math.ceil(invoices?.length / invoicePerPage);

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  };
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayinvoice = invoices?.slice(pagesVisited, pagesVisited + invoicePerPage).map((i) => (
    <div className="card card-dark card-outline">
      <a className="d-block w-100" data-toggle="collapse" href={`#h${i.id}`}>
        <div className="card-header">
          <h4 className="card-title w-100 text-dark">
            Invoice N# {i.id} ~ Date: {i.createdAt.substring(0, 10)}
          </h4>
        </div>
      </a>
      <div id={`h${i.id}`} className="collapse" data-parent="#accordion">
        <div className="card-body">
          <div className="d-flex justify-content-around">
            <span>
              <b> Payment Metod</b> : {i.payment_method}
            </span>
            <span>
              <b> Date:</b> {i.createdAt.substring(0, 10)}
            </span>
          </div>
          <hr />
          <b> Services:</b>
          <table
            id="example2"
            className="table table-bordered table-hover dataTable dtr-inline"
            role="grid"
            aria-describedby="example2_info"
          >
            <thead>
              <th>
                <b>Name</b>
              </th>
              <th>
                <b>Price</b>
              </th>
            </thead>
            {i.services.map((s) => (
              <>
                <tbody>
                  <td>{s.name}</td>
                  <td> $ {s.price}</td>
                </tbody>
              </>
            ))}
          </table>
          <hr />
          <div className="d-flex justify-content-around">
            <span>
              <b>Total Amount</b> : ${i.amount}
            </span>
            <span>
              <button type="button" className="btn btn-dark" onClick={() => getInvoice(i.id)}>
                Download Pdf
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {!loading && <InternalLoader />}
      <div className="container-fluid d-flex justify-content-center p-3 mt-5">
        <div className="col-12" id="accordion">
          {invoices && displayinvoice}

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
    </>
  );
}
