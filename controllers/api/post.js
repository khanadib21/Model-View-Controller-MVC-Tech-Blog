const Router = require("express").Router();
const userAuth = require("../../utils/auth");
const { Post, User, Comment } = require("../../tables");

Router.get("/", async (req, resp) => {
  try {
    const postObj = await Post.findAll({ include: [{ model: User, attributes: ["username"] }],});
    resp.status(200).json(postObj);
  } catch (error) {
    resp.status(500).json(error);
  }
});

Router.post("/", userAuth, async (req, resp) => {
  console.log("req.body", req.body)
  try {
    const post = await Post.create({ ...req.body, user_id: req.session.user_id,});
    resp.status(200).json(post);
  } catch (error) {
    resp.status(400).json(error);
  }
});


Router.get("/:id", async (req, resp) => {
  try {
    const postObj = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [{ model: User, attributes: ["username"] }] },
      ],
    });
    if (!postObj) {
      resp.status(404).json({ message: "No post found with provided id" });
      return;
    }
    resp.status(200).json(postObj);
  } catch (err) {
    resp.status(500).json(err);
  }
});

Router.delete("/:id", userAuth, async (req, resp) => {
  try {
    await Comment.destroy({ where: { post_id: req.params.id } });

    const post = await Post.destroy({ where: { id: req.params.id }});

    if (!post) {
      resp.status(404).json({ message: "No post found with provided id!" });
      return
    }
    resp.status(200).json(post);
  } catch (error) {
    resp.status(500).json(error);
  }
});

Router.put("/:id", userAuth, async (req, resp) => {
  try {
    const post = await Post.update(req.body, { where: { id: req.params.id } });

    if (!post) {
      resp.status(404).json({ message: "No post found with provided id!" });
      return;
    }
    resp.status(200).json(post);
  } catch (error) {
    resp.status(500).json(error);
  }
});

module.exports = Router;
