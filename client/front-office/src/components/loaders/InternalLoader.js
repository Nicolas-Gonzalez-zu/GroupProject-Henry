import React from 'react';

const InternalLoader = () => (
  <div className="overlay">
    <i className="fas fa-3x fa-sync-alt fa-spin" />
    <div className="text-bold pt-2">Loading...</div>
  </div>
);
export default InternalLoader;
