import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import NewService from './newService';
import EditService from './editService';
import InternalLoader from '../../frontoffice/loaders/InternalLoader';
import * as action from '../../../actions/backoffice/creators';

export default function ServicesBO() {
  const services = useSelector((state) => state.serviceBOReducer.services);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const servicePerPage = 9;
  const pagesVisited = pageNumber * servicePerPage;
  const pageCount = Math.ceil(services?.length / servicePerPage);
  const dispatch = useDispatch();
  console.log(services);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  };

  useEffect(() => {
    action.getServices(dispatch);
    reset();
  }, [dispatch]);

  const displayServices = services?.slice(pagesVisited, pagesVisited + servicePerPage).map((s) => (
    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column ">
      <div className="card bg-light d-flex ">
        <div className="card-header border-bottom-0">Service ID : {s.id}</div>
        <div className="card-body pt-0">
          <div className="row">
            <div>
              <h2 className="lead ">
                <b>{s.name}</b>
              </h2>
              {s.status ? (
                <p className="text-success"> Active </p>
              ) : (
                <p className="text-danger"> Inactive </p>
              )}
              <hr />
              <p className="text-muted ">
                <b>Description: </b>
                {s.description}
                <br />
                <b>Price: </b>$ {s.price}
                <br />
                <b>Categories: </b>
                {s.categories.map((c) => (
                  <>
                    <span>• {c.name} </span>
                  </>
                ))}
                •
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex flex-row-reverse">
          <EditService
            categories={s.categories}
            name={s.name}
            price={s.price}
            description={s.description}
            id={s.id}
          />
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="card ">
        <div className="card-header">
          <div className="d-flex justify-content-around">
            <h3>Service</h3>
            <NewService />
          </div>
        </div>
        {!loading && <InternalLoader />}
        <div className="card-body">
          <div className="row"> {services && displayServices}</div>
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
}
