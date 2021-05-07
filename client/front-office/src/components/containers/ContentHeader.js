import React from 'react';

import { withRouter } from 'react-router';

const ContentHeader = ({ history }) => {
  const pathName = history.location.pathname;

  const ContentTitle =
    pathName === '/'
      ? 'Dashboard'
      : pathName.slice(1)[0].toUpperCase() + pathName.slice(1).slice(1);

  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>{ContentTitle}</h1>
          </div>
          {/* <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item active">Blank Page</li>
            </ol>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default withRouter(ContentHeader);
