import React from 'react';

import { Route } from 'react-router-dom';

import ContentHeader from './ContentHeader';

import Profile from '../profile/Profile';
import Budget from '../budget/Budget';
import Wallet from '../wallet/Wallet';

const ContentWrapper = () => (
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

export default ContentWrapper;
