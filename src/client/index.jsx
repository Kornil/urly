// react dependencies
import React from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "emotion";
import emotionNormalize from "emotion-normalize";
// hot reload for development
import { AppContainer } from "react-hot-loader";

import App from "./App";


/* eslint-disable-next-line */
injectGlobal`
  ${emotionNormalize}
`;

const root = document.getElementById("root");

const render = Component => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Component />
    </AppContainer>,
    root
  );
};

render(App);

if(module.hot) {
  module.hot.accept('./App', () => {
      ReactDOM.render(<App />, root);
  });
}
