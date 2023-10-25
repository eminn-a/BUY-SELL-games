const { TOKEN_KEY, SECRET } = require("../config/config");

const jwt = require("../lib/jwt");

exports.auth = async (req, res, next) => {
  const token = req.cookies[TOKEN_KEY];
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      res.locals = decodedToken;
      res.locals.isAuthenticated = true;
      next();
    } catch (err) {
      res.clearCookie(TOKEN_KEY);
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    res.redirect("/users/login");
  }
  next();
};
