import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../actions/frontoffice/creators';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfPreview({ reports }) {
  const stateReports = useSelector((state) => state.reportReducer.reports);
  const dispatch = useDispatch();
  function handleClick() {
    action.resetReports(dispatch);
  }
  const [num, setNum] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNum(numPages);
  }
  console.log(reports, 'reports');
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
      </div>
      <div className="d-flex justify-content-center" style={{ paddingBottom: 10 }}>
        {pageNumber > 1 && (
          <button
            type="button"
            className="btn btn-block btn-dark mr-2"
            style={{ width: 84 }}
            onClick={(e) => previousPage(e)}
          >
            Previous
          </button>
        )}
        <div className="d-flex align-items-center">
          Page {pageNumber} of {num}
        </div>
        {pageNumber < num && (
          <button
            type="button"
            className="btn btn-block btn-dark ml-2"
            style={{ width: 84 }}
            onClick={(e) => nextPage(e)}
          >
            Next
          </button>
        )}
      </div>{' '}
      <div className="d-flex justify-content-center mb-3">
        <button type="button" className="btn btn-danger " onClick={() => handleClick()}>
          Clear PDF Preview
        </button>
      </div>
    </div>
  );
}
