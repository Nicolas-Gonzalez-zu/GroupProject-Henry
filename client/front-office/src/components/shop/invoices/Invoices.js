import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../../actions/creators';

export default function Invoices() {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoiceReducer.invoices);
  console.log(invoices);
  useEffect(() => {
    action.getInvoices(dispatch);
  }, [dispatch]);

  function getInvoice(e) {
    action.getInvoice(e, dispatch);
  }

  return (
    <div classNameName="container-fluid d-flex justify-content-center p-3 mt-5">
      <div className="col-12" id="accordion">
        {invoices &&
          invoices.map((i) => (
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
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => getInvoice(i.id)}
                      >
                        Download Pdf
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
