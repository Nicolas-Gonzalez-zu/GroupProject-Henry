import React from 'react';
import Particles from 'react-particles-js';
import Tilt from 'react-vanilla-tilt';
import '../../../assets/lib/particles/particles.css';
import './About.css';
import parti from '../../../assets/lib/particles/particlesjs-config.json';

export default function About() {
  const team = [
    {
      name: 'Yilmer Avila',
      about: 'Full stack development | Javascript | React | NodeJs',
      img: 'https://avatars.githubusercontent.com/u/21065283?v=4',
      github: 'https://github.com/yavilavi',
      linkedin: 'https://www.linkedin.com/in/yildavilla/',
      web: '',
    },
    {
      name: 'Joaquin Bianchi',
      about: 'Full-Stack Developer | Javascript | React',
      img: 'https://avatars.githubusercontent.com/u/69210391?v=4',
      github: 'https://github.com/joaquinbian',
      linkedin: 'https://www.linkedin.com/in/joaquin-bianchi-js/',
      web: 'https://joaquinbian.github.io/Portfolio/',
    },
    {
      name: 'Jorge Ignacio Garay',
      about: 'Fullstack Web developer | Graphic Designer | React',
      img: 'https://avatars.githubusercontent.com/u/76756295?v=4',
      github: 'https://github.com/Viozhu',
      linkedin: 'https://www.linkedin.com/in/jorgeignaciogaray/',
      web: 'https://viozhu.github.io/',
    },
    {
      name: 'Nicolas Gonzalez Sanabria',
      about: 'Fullstack Developer | Javascript. ReactJS | NodeJS',
      img: 'https://avatars.githubusercontent.com/u/76223482?v=4',
      github: 'https://github.com/Nicolas-Gonzalez-zu',
      linkedin: 'https://www.linkedin.com/in/nicolas-gonzalez-sanabria-2560861b7/',
      web: '',
    },
    {
      name: 'Julio Zaravia',
      about: 'Fullstack Developer | Javascript. ReactJS | NodeJS',
      img: 'https://avatars.githubusercontent.com/u/36289180?v=4',
      github: 'https://github.com/juliozaravia',
      linkedin: 'https://www.linkedin.com/in/julio-zaravia/',
      web: '',
    },
    {
      name: 'Camila Kuba Silva',
      about: 'Full Stack Developer | NodeJS | ReactJS',
      img: 'https://avatars.githubusercontent.com/u/76920761?v=4',
      github: 'https://github.com/CamiKubaSilva',
      linkedin: 'https://www.linkedin.com/in/camilakubasilva/',
      web: '',
    },
    {
      name: 'Edgar Castillejos',
      about: 'Full Stack Developer | JavaScript, ReactJS, NodeJS | Digital Designer',
      img: 'https://avatars.githubusercontent.com/u/75849461?v=4',
      github: 'https://github.com/ecastillejos',
      linkedin: 'https://www.linkedin.com/in/edgarcastillejos/',
      web: '',
    },
  ];

  const goBack = () => {
    window.history.back();
  };
  return (
    <div>
      <div className="login-box" id="login">
        <div className="card aboutcard">
          <div className="card-header text-center">
            <div className="h1 mt-4 d-flex ">
              <div className="col-3">
                <button type="button" className="btn " onClick={goBack}>
                  <h1>
                    <i className="fas fa-arrow-circle-left text-warning" />
                  </h1>
                </button>
              </div>
              <div className="col-4 pl-5 ml-5">
                <img
                  src="https://i.ibb.co/XS4mQ0f/logopng.png"
                  alt="user-avatar"
                  className="img-circle img-fluid mr-2 ml-5"
                  width="55"
                />
                <b className="txt text-warning">e</b>
                <span className="text-dark">-conomy</span>
              </div>
            </div>
            <hr />
            <div className="card-body flex-column">
              <div className="d-flex justify-content-center row">
                {team &&
                  team.map((t) => (
                    <Tilt
                      className="border border-warning m-3 pb-0 aboutcardone"
                      style={{ width: '20rem', 'border-radius': '5px' }}
                    >
                      <div className="card-header text-white border-bottom-0 ">
                        Full Stack Developer
                      </div>
                      <div className="card-body pt-0">
                        <div className="row">
                          <div className="col-7">
                            <h2 className="lead text-warning" style={{ height: '3rem' }}>
                              <b>{t.name}</b>
                            </h2>
                            <p className="text-white text-sm" style={{ height: '4rem' }}>
                              <b>About: </b> {t.about}
                            </p>

                            <div className="d-flex justify-content-center p-2 col row align-items-end">
                              <h3>
                                <a href={t.github}>
                                  <i className="fab fa-github text-warning p-2" />
                                </a>
                              </h3>
                              <a href={t.linkedin}>
                                <h3>
                                  <i className="fab fa-linkedin text-warning p-2" />
                                </h3>
                              </a>
                              {t.web.length === 0 ? (
                                ''
                              ) : (
                                <h3>
                                  <a href={t.web}>
                                    <i className="fas fa-laptop-code text-warning p-2" />
                                  </a>
                                </h3>
                              )}
                            </div>
                          </div>
                          <div className="col-5 text-center">
                            <img src={t.img} alt="user-avatar" className="img-circle img-fluid" />
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Particles id="particles-js2" params={parti} />
    </div>
  );
}
