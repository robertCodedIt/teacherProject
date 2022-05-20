import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN || "dev-z0ci93jb.us.auth0.com"}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID||"Mv7E2LIBFxB5aVG0HaCQHpeJcdxQFeBe"}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);