const { verifyToken } = require("../utils/tokenUtils");

const SECRET = process.env.SECRET || "secret";

exports.checkLoggedIn = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(401).json({ error: "token is missing" });
    return;
  }

  const { username, err } = verifyToken(SECRET, token);

  if (err) {
    res.status(401).json(err);
    return;
  }
  req.body.username = username;

  next();
};
