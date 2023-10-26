const { User } = require("../../tables");
const Router = require("express").Router();

Router.get("/", (req, resp) => {
  User.findAll({ attributes: { exclude: ["password"] }})
  .then((userObj) => resp.json(userObj))
  .catch((error) => {resp.status(500).json(error);});
});

Router.post("/login", async (req, resp) => {
  try {
    const userObj = await User.findOne({ where: { username: req.body.username } });

    if (!userObj) {
      resp
        .status(400)
        .json({ message: "Incorrect password or user_name" });
      return;
    }

    const isvalidPassword = await userObj.checkPassword(req.body.password);

    if (!isvalidPassword) {
      resp.status(400).json({ message: "Incorrect password or email"});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userObj.id;
      req.session.logged_in = true;

      resp.status(200).json({ user: userObj, message: "You are logged in!" });
    });
  } catch (error) {
    resp.status(400).json(error);
  }
});

Router.post("/logout", (req, resp) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      resp.status(204).end();
    });
  } else {
    resp.status(404).end();
  }
});

Router.post("/signup", async (req, resp) => {
  try {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.username = req.body.user_name;

    const userObj = await user.save();

    req.session.save(() => {
      req.session.user_id = userObj.id;
      req.session.logged_in = true;

      resp.status(200).json(userObj);
    });
  } catch (error) {
    resp.status(400).json(error);
  }
});


module.exports = Router;
