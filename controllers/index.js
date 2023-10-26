// Import the necessary modules and routes
const Router = require("express").Router();
const api = require("./api");
const home = require("./home");

Router.use("/", home);
Router.use("/api", api);

module.exports = Router;
