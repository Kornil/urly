const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const dev = process.env.NODE_ENV !== "production";

const DefinePluginConfig = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production")
});

const hotReloadMiddlewares = [
  "react-hot-loader/patch",
  "webpack-hot-middleware/client"
];

const clientConfig = {
  entry: dev
    ? ["isomorphic-fetch", ...hotReloadMiddlewares, "./src/client/index.jsx"]
    : ["isomorphic-fetch", "./src/client/index.jsx"],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/public"),
    publicPath: dev ? "http://localhost:8888/public/" : "/"
  },
  mode: dev ? "development" : "production",
  plugins: dev
    ? [new webpack.HotModuleReplacementPlugin()]
    : [DefinePluginConfig]
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  externals: [nodeExternals()],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      assets: path.resolve(__dirname, "src/client/assets/"),
      app: path.resolve(__dirname, "src/client/app/")
    }
  },
  output: {
    path: __dirname,
    filename: "server.js",
    publicPath: "/"
  },
  mode: dev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};

module.exports = [clientConfig, serverConfig];
