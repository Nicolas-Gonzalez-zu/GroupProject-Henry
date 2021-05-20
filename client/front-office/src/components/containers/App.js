import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';
import Register from '../register';
import FullLoading from '../loaders/FullLoading';

import { initialize } from '../../actions/creators';
import Login from '../login';

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
  return <FullLoading />;
}

export default App;
