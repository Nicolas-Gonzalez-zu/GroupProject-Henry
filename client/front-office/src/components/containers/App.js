import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';
import Register from '../register';
import ForgotPassword from '../ForgotPassword';

import { initialize } from '../../actions/creators';
import Login from '../login';
import InternalLoader from '../loaders/InternalLoader';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.authReducers.initialized);

  useEffect(() => {
    if (!initialized) {
      initialize(dispatch);
    }
  }, [initialized, dispatch]);

  if (initialized) {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register">
          <div className="register-box">
            <Register />
          </div>
        </Route>
        <Route exact path="/forgot">
          <div className="register-page">
            <div className="register-box">
              <ForgotPassword />
            </div>
          </div>
        </Route>
        <Route path="/">
          <div className="wrapper">
            <NavBar />
            <SideBar />
            <ContentWrapper />
            <Footer />
          </div>
        </Route>
      </Switch>
    );
  }
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}
    >
      <InternalLoader />
    </div>
  );
}

export default App;
