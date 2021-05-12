import React from 'react';
import Loader from '../../resources/Loader.gif';

const FullLoading = () => (
  <div style={{ textAlign: 'center' }}>
    <img src={Loader} alt="Loader" style={{ width: 600, position: 'relative', top: 35 }} />
  </div>
);
export default FullLoading;
