/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import bodyParser from "body-parser";
import shortid from "shortid";
import NodeCache from "node-cache";
import "isomorphic-fetch";

import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../../webpack.config";

import App from "../client/App";
import htmlMarkup from "./htmlMarkup";

require("es6-promise").polyfill();

const app = express();

if (process.env.NODE_ENV === "development") {
  const compiler = webpack(webpackConfig[0]);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig[0].output.publicPath
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

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

    const shortId = shortid.generate();

    urlCache.set(shortId, { url });

    res.json({ hash: shortId });
  })
  .get((req, res) => {
    const totalUrls = urlCache.keys();

    if (totalUrls.length) {
      urlCache.mget(totalUrls, (error, values) => {
        if (error) throw error;
        res.json(values);
      });
    }
  });

app
  .route("/v1/:hash")
  .get((req, res) => {
    const { hash } = req.params;

    urlCache.get(hash, (err, value) => {
      if (err || value === undefined) {
        res
          .status(404)
          .json(JSON.stringify("Shortlink provided does not exist"));
      } else {
        res.redirect(value.url);
      }
    });
  })
  .delete((req, res) => {
    const { hash } = req.params;
    urlCache.del(hash, err => {
      if (err) {
        res
          .status(404)
          .json(JSON.stringify("Shortlink provided does not exist"));
      }
    });
    res.status(200);
  });

app.get("*", (req, res) => {
  // eslint-disable-next-line react/jsx-filename-extension
  const markup = renderStylesToString(renderToString(<App />));

  res.send(htmlMarkup(markup));
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server is listening on port: 8888`);
});
