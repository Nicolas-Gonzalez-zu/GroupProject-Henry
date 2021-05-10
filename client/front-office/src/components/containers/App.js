import React, { useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';
import AlternativeLogin from '../alternativeLogin';
import Register from '../register';
import FullLoading from '../loaders/FullLoading';

import { initialize } from '../../actions/creators';

function App() {
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.authReducers.redirect);
  const initialized = useSelector((state) => state.authReducers.initialized);

  useEffect(() => {
    if (!initialized) {
      initialize(dispatch);
    }
  }, [initialized, dispatch]);

  if (initialized) {
    return redirect ? (
      <Redirect to={redirect} />
    ) : (
      <Switch>
        <Route exact path="/login" component={AlternativeLogin} />
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
