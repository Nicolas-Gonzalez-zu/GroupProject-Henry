import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';
import Register from '../register';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../resetPassword';
import About from '../about/About';

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
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/resetPassword/:id/:token"
          render={({ match }) => <ResetPassword id={match.params.id} token={match.params.token} />}
        />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/about" component={About} />
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
