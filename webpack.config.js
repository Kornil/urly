const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const dev = process.env.NODE_ENV !== "production";

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, "/src/index.html"),
  filename: "index.html",
  inject: "body"
});

const DefinePluginConfig = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production")
});

const clientConfig = {
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    "whatwg-fetch",
    "./src/client/index.jsx"
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/public")
  },
  mode: dev ? "development" : "production",
  plugins: dev
    ? [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
    : [HTMLWebpackPluginConfig, DefinePluginConfig]
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
