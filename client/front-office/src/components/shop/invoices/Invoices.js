import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import * as action from '../../../actions/creators';

export default function Invoices() {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoiceReducer.invoice);

  function getInvoice(e) {
    action.getInvoice(2, dispatch);
  }

  return (
    <div className="container-fluid d-flex justify-content-center p-3 mt-5">
      <img
        className="col-5"
        src="https://www.ccisua.org/wp-content/uploads/2017/05/fa-work-in-progress-computer.png"
      />
      <button type="button" onClick={(e) => getInvoice(e)}>
        Ejemplo
      </button>
    </div>
  );
}
