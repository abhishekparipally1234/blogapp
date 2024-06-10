import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../Styles.css';
import './Welcome.css';

function Userdash() {
  const { state } = useLocation();
  const user = state || JSON.parse(localStorage.getItem('user'));

  return (
    <div className='text-end m-4'>
      <p className='lead fs-3 text-info'>Welcome, <span className='text-danger fs-1'>{user.name}</span></p>
      <p className='lead'>{user.email}</p>
    </div>
  );
}

export default Userdash;
