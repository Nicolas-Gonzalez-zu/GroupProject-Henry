import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Redirect } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../actions/creators';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfPreview() {
  const stateReports = useSelector((state) => state.reportReducer.reports);
  const dispatch = useDispatch();
  const location = useLocation();
  const { reports } = location.state;
  function handleClick() {
    action.resetReports(dispatch);
  }
  const [num, setNum] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNum(numPages);
  }

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function previousPage() {
    setPageNumber(pageNumber - 1);
  }

  return (
    <div>
      <div className="d-flex justify-content-around" style={{ margin: 20 }}>
        {!stateReports && <Redirect to="/reports" />}
        {reports && (
          <div className="d-inline">
            <Document file={reports} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        )}
        {reports && (
          <div className="d-inline">
            <button
              type="button"
              style={{ width: 150 }}
              className="btn btn-block bg-gradient-danger btn-lg"
              onClick={(e) => handleClick(e)}
            >
              Download another report
            </button>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center" style={{ paddingBottom: 10 }}>
        <button
          type="button"
          className="btn btn-block btn-outline-warning"
          style={{ width: 84 }}
          onClick={(e) => previousPage(e)}
        >
          Previous
        </button>
        <div className="d-flex align-items-center">
          Page {pageNumber} of {num}
        </div>
        <button
          type="button"
          className="btn btn-block btn-outline-warning"
          style={{ width: 84 }}
          onClick={(e) => nextPage(e)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
