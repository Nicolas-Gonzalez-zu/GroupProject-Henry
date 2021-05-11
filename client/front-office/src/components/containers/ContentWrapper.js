import React, { useEffect } from 'react';

import { Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ContentHeader from './ContentHeader';

import Profile from '../profile/Profile';
import Budget from '../budget/Budget';
import Wallet from '../wallet/Wallet';
import EditForm from '../EditForm/EditForm';
import ChangePassword from '../ChangePassword/ChangePassword';

// import * as action from '../../actions/creators';

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
            <div>movements</div>
          </Route>

          <Route exact path="/reports">
            <div>reports</div>
          </Route>

          <Route exact path="/shop">
            <div>shop</div>
          </Route>

          <Route exact path="/services">
            <div>services</div>
          </Route>
        </div>
      </section>
    </div>
  );
};

export default ContentWrapper;
