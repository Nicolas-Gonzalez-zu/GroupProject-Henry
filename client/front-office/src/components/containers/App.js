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

        <ContentWrapper />

        <Route exact path="/">
          <Footer />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
