import React from 'react';
import Loader from '../../resources/Loader.gif';

const FullLoading = () => (
  <div style={{ textAlign: 'center' }}>
    <img src={Loader} alt="Loader" style={{ width: '45%', position: 'relative', top: '2rem' }} />
  </div>
);
export default FullLoading;
