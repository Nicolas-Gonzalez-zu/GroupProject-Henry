import React, { useEffect } from 'react';

import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';
import Register from '../../frontoffice/register';
import ForgotPassword from '../../frontoffice/ForgotPassword';
import ResetPassword from '../../frontoffice/resetPassword';
import FormGoogle from '../../frontoffice/FormGoogle';
import LandingPage from '../../landingPage';
import About from '../../frontoffice/about/About';

import { initialize } from '../../../actions/frontoffice/creators';
import Login from '../login';
import InternalLoader from '../../frontoffice/loaders/InternalLoader';

import { FRONT_OFFICE_MENU, BACK_OFFICE_MENU } from '../../../utils/frontoffice/menus';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const initialized = useSelector((state) => state.authReducers.initialized);
  const loggedIn = useSelector((store) => store.authReducers.sessionData.loggedIn);
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    html.style.height = '100vh';
    if (!initialized) {
      initialize(dispatch);
    }
    if (
      initialized &&
      !loggedIn &&
      !location.pathname.includes('resetPassword') &&
      !location.pathname.includes('login') &&
      !location.pathname.includes('register') &&
      !location.pathname.includes('forgot') &&
      (location.pathname.includes('admin') || location.pathname.includes('client'))
    ) {
      const redirectTo = location.pathname.includes('admin') ? '/admin' : '/client';
      history.push(`${redirectTo}/login`);
    }
  }, [initialized, dispatch, loggedIn, location.pathname, history]);

  if (initialized) {
    return (
      <Switch>
        {/* client routes */}
        <Route path="/client">
          <Switch>
            <Route exact path="/client/login" render={() => <Login adm={false} />} />
            <Route exact path="/client/login/google" component={FormGoogle} />
            <Route exact path="/client/register" component={Register} />
            <Route
              exact
              path="/client/resetPassword/:id/:token"
              render={({ match }) => (
                <ResetPassword id={match.params.id} token={match.params.token} />
              )}
            />
            <Route exact path="/client/forgot" component={ForgotPassword} />
            <Route path="/client">
              {loggedIn ? (
                <div className="wrapper">
                  <NavBar adm={false} />
                  <SideBar menu={FRONT_OFFICE_MENU} adm={false} />
                  <ContentWrapper adm={false} />
                  <Footer />
                </div>
              ) : (
                ''
              )}
            </Route>
          </Switch>
        </Route>

        {/* backofice routes */}
        <Route path="/admin">
          <Switch>
            <Route exact path="/admin/login" render={() => <Login adm />} />
            <Route
              exact
              path="/admin/resetPassword/:id/:token"
              render={({ match }) => (
                <ResetPassword id={match.params.id} token={match.params.token} />
              )}
            />
            <Route exact path="/admin/forgot" component={ForgotPassword} />
            {loggedIn ? (
              <Route path="/admin">
                <div className="wrapper">
                  <NavBar adm />
                  <SideBar menu={BACK_OFFICE_MENU} adm />
                  <ContentWrapper adm />
                  <Footer />
                </div>
              </Route>
            ) : (
              ''
            )}
          </Switch>
        </Route>
        {/* Landing page */}
        <Route path="/">
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={LandingPage} />
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
