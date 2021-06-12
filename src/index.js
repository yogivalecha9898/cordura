import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Auth0Provider
      domain="dev-e80tfvhm.us.auth0.com"
      clientId="RmHcr5pi9kBKMEAMn5Mv80LspYKvoyS2"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>,
  document.getElementById('root')
);

