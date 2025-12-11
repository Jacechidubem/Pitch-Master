 import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store  from './redux/store'; // NEW
import { Provider } from 'react-redux'; // NEW

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* NEW */}
      <App />
    </Provider> {/* NEW */}
  </React.StrictMode>
);