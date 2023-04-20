import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { history } from './utils/history';
import { ConnectedRouter  } from 'connected-react-router';
 import AuthProvider from './utils/authProvider';
 import userManager from './api/loginService';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider userManager={userManager} store={store} >
        <ConnectedRouter history ={history}>
          <App />
        </ConnectedRouter>
      </AuthProvider>
      
   
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
