// Import the required modules
const Router = require("express").Router();
const users = require("./user");
const posts = require("./post");
const comments = require("./comment");

Router.use("/users", users);
Router.use("/comments", comments);
Router.use("/posts", posts);

module.exports = Router;
