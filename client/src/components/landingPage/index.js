import React, { useState } from 'react';
import { useHistory } from 'react-router';
import $ from 'jquery';
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();
  const onclick = () => {
    const e1 = $('.rocketImg');
    e1.addClass('launching');
    e1.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', (e) => {
      history.push('/client/login');
    });
  };

  return (
    <>
      <div className="navBar">
        <div className="logo">
          <img
            src="https://i.ibb.co/XS4mQ0f/logoscalable.png"
            alt="logoImg"
            className="rocketImg"
            name="rocketGif"
          />
          <span style={{ fontSize: '3vw' }} className="brand-text font-weight-light txt">
            e-conomy
          </span>
        </div>
      </div>
      <section className="layout">
        <div className="callToActionContainer">
          <div className="callToAction">
            <p className="text brand-text font-weight-light txt">Keep your finances in order</p>
            <div className="callToActionButtons">
              <button className="buttonLogin" type="button" onClick={onclick}>
                Go for it
              </button>
              <a className="meetTheTeam" href="/about">
                Meet the team
              </a>
            </div>
          </div>
        </div>
        <div className="cloudContainer">
          <div className="cloud" />
          <div className="cloud2" />
          <div className="cloud3" />
          <div className="cloud4" />
        </div>
        <div className="wave" />
      </section>
    </>
  );
}
export default LandingPage;
