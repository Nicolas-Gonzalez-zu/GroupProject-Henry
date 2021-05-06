import React from 'react';

import ContentHeader from './ContentHeader';

const ContentWrapper = () => (
  <div className="content-wrapper">
    <ContentHeader />

    <section className="content">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Nombre acción ej (Editar)</h3>
        </div>
        <div className="card-body">Aquí viene el contenido principal</div>
      </div>
    </section>
  </div>
);

export default ContentWrapper;
