import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router/Router'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from './components/Footer/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <div className='App'>
      <Router />
      <Footer />
    </div>

  </>
);

