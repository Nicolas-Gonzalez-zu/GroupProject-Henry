import React from 'react';

import { withRouter } from 'react-router';

const ContentHeader = ({ history }) => (
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>404 Not Found</h1>
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
export default withRouter(ContentHeader);
