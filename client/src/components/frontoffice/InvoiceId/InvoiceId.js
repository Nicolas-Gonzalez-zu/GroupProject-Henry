import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../actions/frontoffice/creators';
import InternalLoader from '../loaders/InternalLoader';

const InvoiceId = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [invoicePdf, setInvoicePdf] = useState(false);
  const invoiceId = useSelector((state) => state.invoiceReducer.invoiceId);
  const dispatch = useDispatch();

  useEffect(() => {
    const { idInvoice } = match.params;
    action.getInvoiceById(idInvoice, dispatch); // por algun motivo esto se ejecuta muchas veces
    // reset();
    console.log('hola');
  }, [dispatch, match.params]);

  window.localStorage.clear();
  const getInvoicePdf = (id, e) => {
    action.getInvoice(id, dispatch);
    setInvoicePdf(!invoicePdf);
  };

  console.log(invoiceId);
  return (
    <div className="invoice p-3 mb-3">
      {!loading && InternalLoader}
      {loading && (
        <div>
          <div className="card-header bg-dark">
            <div className="row">
              <div className="col-6">
                <h4>
                  <img
                    src="https://i.ibb.co/XS4mQ0f/logopng.png"
                    alt="user-avatar"
                    className="img-circle img-fluid"
                    width="55"
                  />
                  <span className="brand-text font-weight-light txt">e-conomy invoice</span>
                </h4>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <div className="d-flex flex-column  align-items-center justify-content-around">
                  <h6 className="mb-0">
                    Invoice id: <b>{invoiceId && invoiceId.id}</b>
                  </h6>

                  <div>
                    <h6 className="mb-0">
                      Created at:
                      <b>{invoiceId && invoiceId.createdAt && invoiceId.createdAt.slice(0, 10)}</b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceId &&
                    invoiceId.services &&
                    invoiceId.services.map((s) => (
                      <tr key={s.id}>
                        <td>{s.name}</td>
                        <td>$ {s.price}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
              <div className="d-flex align-items-center">
                <p className="lead">Payment Methods:</p>
                <div className="d-flex align-items-center ml-3">
                  <img
                    src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/082013/untitled-1_49.png?itok=S3wtZ8fs"
                    alt="American Express"
                    height="60"
                    width="60"
                  />
                  <p className="lead ml-4">
                    <b>{invoiceId && invoiceId.payment_method}</b>
                  </p>
                </div>
              </div>
              <div className="d-flex">
                <p className="lead">Payment Status:</p>
                <p className="lead ml-4">
                  <b>{invoiceId && invoiceId.status}</b>
                </p>
              </div>
              <div className="d-flex align-self-start">
                <button
                  type="button"
                  className="btn btn-primary float-right mr-4"
                  onClick={(e) => getInvoicePdf(invoiceId.id, e)}
                >
                  <i className="fas fa-download" /> Generate PDF
                </button>
              </div>
            </div>
            <div className="col-7">
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Total amount:</th>
                      <td>$ {invoiceId && invoiceId.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InvoiceId;
