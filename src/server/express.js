import express from "express";

const server = express();

const webpack = require("webpack");
const config = require("../../config/webpack.dev.js")(
  {},
  { mode: "development" }
);
const compiler = webpack(config);

const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);

const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

/**
 * Use correct order for middlewares
 */
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);

const staticMiddleware = express.static("dist");

server.use(staticMiddleware);

server.get("/", (req, res) => {});

server.listen(8080, () => {
  console.log("Server is listening");
});
