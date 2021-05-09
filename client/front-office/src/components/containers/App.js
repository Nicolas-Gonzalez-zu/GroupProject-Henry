import { React, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';
import AlternativeLogin from '../alternativeLogin';

import * as action from '../../actions/creators';

function App() {
  const sessionData = useSelector((store) => store.loginReducer.sessionData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionData.loggedIn) {
      action.getMe(dispatch);
    }
  }, []);

  return sessionData.loggedIn ? (
    <>
      <NavBar />
      <SideBar />
      <ContentWrapper />
      <Footer />
    </>
  ) : (
    <AlternativeLogin />
  );
}

export default App;
