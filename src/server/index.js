import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import bodyParser from "body-parser";
import validUrl from "valid-url";
import shortid from "shortid";
import NodeCache from "node-cache";
import "isomorphic-fetch";

import App from "../client/App";
import htmlMarkup from "./htmlMarkup";

require("es6-promise").polyfill();

const app = express();

const urlCache = new NodeCache();

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"));

app.use(bodyParser.json());

app
  .route("/v1/links")
  .post((req, res) => {
    const { url } = req.body;

    if (validUrl.isHttpUri(url)) {
      const shortId = shortid.generate();

      urlCache.set(shortId, { url });

      res.json(JSON.stringify({ hash: shortId }));
    } else {
      res.status(500).json(JSON.stringify("Url provided is invalid"));
    }
  })
  .get((req, res) => {
    const totalUrls = urlCache.keys();
    urlCache.mget(totalUrls, (error, values) => {
      if (error) throw error;
      res.json(JSON.stringify(values));
    });
  });

app.get("/v1/:hash", (req, res) => {
  const { hash } = req.params;

  urlCache.get(hash, (err, value) => {
    if (err || value === undefined) {
      res.status(404).json(JSON.stringify("Shortlink provided does not exist"));
    } else {
      res.redirect(value.url);
    }
  });
});

app.get("*", (req, res) => {
  // eslint-disable-next-line react/jsx-filename-extension
  const markup = renderStylesToString(renderToString(<App />));

  res.send(htmlMarkup(markup));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port: 3000`);
});
