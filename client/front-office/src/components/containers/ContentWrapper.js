import React, { useEffect } from 'react';

import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ContentHeader from './ContentHeader';

import Profile from '../profile/Profile';
import Budget from '../budget/Budget';
import Wallet from '../wallet/Wallet';
import EditForm from '../EditForm/EditForm';
import ChangePassword from '../ChangePassword/ChangePassword';
import Movement from '../movement/Movement';
import Transfer from '../movement/transfer/Transfer';
import Income from '../movement/income/Income';
import Shop from '../shop/Shop';
import Invoices from '../shop/invoices/Invoices';
import Services from '../shop/services/Services';
import Orders from '../orders/Orders';
import Reports from '../reports/Reports';

// import '../../assets/plugins/bootstrap/js/bootstrap.min';

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
            <div>dashboard</div>
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

          <Route exact path="/movements">
            <Movement />
          </Route>

          <Route exact path="/transfer">
            <Transfer />
          </Route>

          <Route exact path="/income">
            <Income />
          </Route>

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
        </div>
      </section>
    </div>
  );
};

export default ContentWrapper;
