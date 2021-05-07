import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import NavBar from '../navbar';
import SideBar from '../sidebar';
import ContentWrapper from './ContentWrapper';
import Footer from './Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/">
          <NavBar />
        </Route>

        <Route path="/">
          <SideBar />
        </Route>

        <Route path="/">
          <ContentWrapper />
        </Route>

        <Route exact path="/profile">
          <ContentWrapper />
        </Route>

        <Route exact path="/wallet">
          <ContentWrapper />
        </Route>

        <Route exact path="/account">
          <ContentWrapper />
        </Route>

        <Route exact path="/movements">
          <ContentWrapper />
        </Route>

        <Route exact path="/reports">
          <ContentWrapper />
        </Route>

        <Route exact path="/shop">
          <ContentWrapper />
        </Route>

        <Route exact path="/services">
          <ContentWrapper />
        </Route>
        <Route exact path="/">
          <Footer />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
