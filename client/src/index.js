import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { UserProvider } from './components/Context/UserContext';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

const REACT_APP_AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
  // console.log("Domain",REACT_APP_AUTH0_DOMAIN)
const REACT_APP_AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID;
  // console.log("clientId", REACT_APP_AUTH0_CLIENT_ID)

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
  >
      <UserProvider>
        <App />
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
);

