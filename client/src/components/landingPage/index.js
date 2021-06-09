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
        <div>
          <img
            src="https://i.ibb.co/XS4mQ0f/logoscalable.png"
            alt="logoImg"
            className="rocketImg"
            name="rocketGif"
          />
          <img className="logo" src="https://i.ibb.co/SskGjNd/economy.png" />
        </div>
      </div>
      <section className="layout">
        <div className="callToActionContainer">
          <div className="callToAction">
            <img className="text" alt="texto" src="https://i.ibb.co/4f4jHkJ/textLand.png" />
            <div className="callToActionButtons">
              <button className="buttonLogin" type="button" onClick={onclick}>
                <br />
              </button>
              <a className="meetTheTeam" href="/about">
                <img alt="MeetUs" className="meet" src="https://i.ibb.co/QDMnDH1/meet.png" />
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
