/* eslint-disable import/no-extraneous-dependencies */
import "normalize.css";

// react dependencies
import React from "react";
import ReactDOM from "react-dom";
// hot reload for development
import { AppContainer } from "react-hot-loader";

import App from "./App";

const root = document.getElementById("root");

const hydrate = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  );
};

hydrate(App);
