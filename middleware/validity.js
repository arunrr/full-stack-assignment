// Check if user input is valid
exports.checkValidity = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "user input is invalid" });
  } else {
    next();
  }
};
