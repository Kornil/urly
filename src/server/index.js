import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";

import App from "../client/App";
import htmlMarkup from "./htmlMarkup";

const app = express();


// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));


app.get("*", (req, res) => {
  // eslint-disable-next-line react/jsx-filename-extension
  const markup = renderStylesToString(renderToString(<App />));

  res.send(htmlMarkup(markup));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: 3000`);
});
