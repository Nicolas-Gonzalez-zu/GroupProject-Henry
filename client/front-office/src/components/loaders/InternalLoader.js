import React from 'react';
import Loader2 from '../../resources/Loader2.gif';

const InternalLoader = () => (
  <div
    style={{
      border: '1px solid black',
      borderRadius: '20px',
      textAlign: 'center',
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: '100',
      width: '40%',
      right: '30%',
      top: '30%',
    }}
  >
    <img src={Loader2} alt="Loader" style={{ width: '80%', padding: '20px' }} />
  </div>
);
export default InternalLoader;
