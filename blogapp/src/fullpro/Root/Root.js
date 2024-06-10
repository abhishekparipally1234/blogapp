import React from 'react';
import { Outlet } from 'react-router-dom';
import Head from './Head';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles.css';
function Root() {
  return (
    <div>
      <Head />
      <div className="container mt-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Root;
