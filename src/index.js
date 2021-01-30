import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import demo1 from './services/DBService'

ReactDOM.render(
  <React.StrictMode>
    {demo1()}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

