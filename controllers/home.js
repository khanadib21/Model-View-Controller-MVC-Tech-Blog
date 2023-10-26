// Import necessary packages and models
const Router = require("express").Router();
const userAuth = require("../utils/auth");
const { Post, User, Comment } = require("../tables");

Router.get("/", async (req, resp) => {
  try {
    const postObj = await Post.findAll({ include: [{ model: User, attributes: ["username"] }] });
    const allposts = postObj.map((post) => post.get({ plain: true }));
    resp.render("homepage", { posts: allposts, logged_in: req.session.logged_in });
  } catch (error) {
    resp.status(500).json(error);
  }
});

Router.get("/post/:id", userAuth, async (req, resp) => {
  try {
    const postObj = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    const post = postObj.get({ plain: true });
    resp.render("post", {...post, logged_in: req.session.logged_in });
  } catch (error) {
    resp.status(500).json(error);
  }
});

Router.get("/dashboard", userAuth, async (req, resp) => {
  try {
    const postObj = await Post.findAll({where: { user_id: req.session.user_id }, include: [{ model: User, attributes: ["username"] }] });

    const allPosts = postObj.map((post) => post.get({ plain: true }));
    console.log("allPosts", allPosts)
    resp.render("dashboard", {
      logged_in: req.session.logged_in,
      posts: allPosts,
    });
  } catch (error) {
    resp.status(500).json(error);
  }
});

Router.get("/newpost", (req, resp) => {
  if (req.session.logged_in) {
    resp.render("newpost");
    return;
  }
  resp.redirect("/login");
});

Router.get("/editpost/:id", async (req, resp) => {
  try {
    const postObj = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    const post = postObj.get({ plain: true });

    resp.render("editpost", {
      logged_in: req.session.logged_in,
      ...post,
    });
  } catch (error) {
    resp.status(500).json(error);
  }
});

Router.get("/login", (req, resp) => {
  if (req.session.logged_in) {
    resp.redirect("/dashboard");
    return;
  }
  resp.render("login");
});

Router.get("/signup", (req, resp) => {
  if (req.session.logged_in) {
    resp.redirect("/dashboard");
    return;
  }
  resp.render("signup");
});

module.exports = Router;






