const bcrypt = require("bcrypt");

exports.encryptPassword = async (plainPassword, saltRound = 10) => {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
  return hashedPassword;
};

exports.decryptPassword = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};
