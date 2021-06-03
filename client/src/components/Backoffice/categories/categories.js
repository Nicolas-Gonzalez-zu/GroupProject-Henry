import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import NewCategories from './newCategories';
import InternalLoader from '../../frontoffice/loaders/InternalLoader';
import EditCategories from './editCategories';
import * as action from '../../../actions/backoffice/creators';

export default function Categories() {
  const categories = useSelector((state) => state.categoryBOReducer.category);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const categoryPerPage = 7;
  const pagesVisited = pageNumber * categoryPerPage;
  const pageCount = Math.ceil(categories?.length / categoryPerPage);
  const dispatch = useDispatch();

  const reset = () => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  };

  useEffect(() => {
    action.getCategory(dispatch);
    reset();
  }, [dispatch]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displaycategory = categories
    ?.slice(pagesVisited, pagesVisited + categoryPerPage)
    .map((x) => (
      <tbody>
        <tr>
          <td>{x.name}</td>

          <td>
            <EditCategories id={x.id} name={x.name} />
          </td>
        </tr>
      </tbody>
    ));

  return (
    <div>
      <div className="card ">
        <div className="card-header">
          <div className="d-flex justify-content-around">
            <h3>Categories</h3>
            <NewCategories />
          </div>
        </div>
        {!loading && <InternalLoader />}
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th style={{ width: '1rem' }}>Edit</th>
              </tr>
            </thead>
            {categories && displaycategory}
          </table>
        </div>
      </div>
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
  );
}
