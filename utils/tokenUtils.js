const crypto = require("crypto");

exports.createToken = (username, secret) => {
  return crypto.createHmac("sha256", secret).update(username).digest("hex");
};

exports.verifyToken = (username, secret, token) => {
  calculatedToken = this.createToken(username, secret);

  return calculatedToken === token;
};
