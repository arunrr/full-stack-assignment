// Check if user input is valid
exports.checkValidity = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "user input is invalid" });
  } else {
    next();
  }
};
