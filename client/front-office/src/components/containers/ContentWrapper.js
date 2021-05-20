import React, { useEffect } from 'react';

import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ContentHeader from './ContentHeader';

import Profile from '../profile/Profile';
import Budget from '../budget/Budget';
import Wallet from '../wallet/Wallet';
import EditForm from '../EditForm/EditForm';
import ChangePassword from '../ChangePassword/ChangePassword';
import Expense from '../movement/Expense';
import Transfer from '../movement/transfer/Transfer';
import Income from '../movement/income/Income';
import Shop from '../shop/Shop';
import Invoices from '../shop/invoices/Invoices';
import Services from '../shop/services/Services';
import Orders from '../orders/Orders';
import Reports from '../reports/Reports';
import PdfPreview from '../pdfPreview/PdfPreview';
import Pro from '../Pro/Pro';


const ContentWrapper = () => {
  const history = useHistory();
  const loggedIn = useSelector((store) => store.authReducers.sessionData.loggedIn);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!loggedIn) {
      history.push('/login');
    }
  }, [loggedIn, dispatch, history]);

  return (
    <div className="content-wrapper">
      <ContentHeader />
      <section className="content">
        <div className="card">
          <Route exact path="/">
            <div className="container-fluid d-flex justify-content-center p-3 mt-5">
              <img
                className="col-5"
                src="https://www.ccisua.org/wp-content/uploads/2017/05/fa-work-in-progress-computer.png"
              />
            </div>
          </Route>
          <Route exact path="/pro">
            <Pro />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>

          <Route exact path="/edit">
            <EditForm />
          </Route>

          <Route exact path="/changePassword">
            <ChangePassword />
          </Route>

          <Route exact path="/wallet">
            <Wallet />
          </Route>

          <Route exact path="/budget">
            <Budget />
          </Route>

          <Route exact path="/income" component={Income} />
          <Route exact path="/expense" component={Expense} />
          <Route exact path="/transfer" component={Transfer} />

          <Route exact path="/reports">
            <Reports />
          </Route>

          <Route exact path="/shop">
            <Shop />
          </Route>

          <Route exact path="/invoices">
            <Invoices />
          </Route>

          <Route exact path="/services">
            <Services />
          </Route>

          <Route exact path="/orders">
            <Orders />
          </Route>

          <Route exact path="/preview">
            <PdfPreview />
          </Route>
        </div>
      </section>
    </div>
  );
};

export default ContentWrapper;
