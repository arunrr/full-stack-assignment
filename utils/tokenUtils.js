const jwt = require("jsonwebtoken");

exports.createToken = (username, secret) => {
  return jwt.sign({ username }, secret);
};

exports.verifyToken = (secret, token) => {
  try {
    const username = jwt.verify(token, secret);
    return username;
  } catch (err) {
    return err;
  }
};
