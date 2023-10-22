const userAuth = (req, resp, next) => {
  if (!req.session.logged_in) {
    resp.redirect("/login");
  } else {
    next();
  }
};

module.exports = userAuth;

