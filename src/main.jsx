import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/css/index.css';
import './assets/css/components.css';
import './assets/css/wrapper.css';

import { Provider } from 'react-redux';
import { store } from './store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
