const router = require("express").Router();
const userAuth = require("../../utils/auth");
const { Comment } = require("../../tables");

router.post("/", userAuth, async (req, resp) => {
  try {
    const comment = await Comment.create({
      user_id: req.session.user_id,
      ...req.body,
    });

    resp.status(200).json(comment);
  } catch (error) {
    resp.status(400).json(error);
  }
});

module.exports = router;

