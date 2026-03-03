import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import Bar from './Components/Bar/Bar';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);


