const express = require("express");
const cookieParser = require("cookie-parser");

const { encryptPassword, decryptPassword } = require("./utils/passwordUtils");
const { checkValidity } = require("./middleware/validity");
const { createToken } = require("./utils/tokenUtils");
const { checkLoggedIn } = require("./middleware/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3001;
const SECRET = process.env.SECRET || "secret";

const USERS = [];

const QUESTIONS = [
  {
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [
      {
        input: "[1,2,3,4,5]",
        output: "5",
      },
    ],
  },
];

const SUBMISSION = [];

// Returns username if successful
app.post("/signup", checkValidity, async function (req, res) {
  const { username } = req.body;
  let { password } = req.body;

  userPresent = USERS.find((user) => user.username === username);
  if (userPresent) {
    res.status(409).json({ error: "user already present" });
    return;
  }

  password = await encryptPassword(password);

  USERS.push({ username, password });

  res.status(200).json({ username });
});

// Returns token as cookie if successful
app.post("/login", checkValidity, async function (req, res) {
  const { username, password } = req.body;

  userPresent = USERS.find((user) => user.username === username);
  if (!userPresent) {
    res.status(404).json({ error: "user not found" });
    return;
  }

  const passwordMatch = await decryptPassword(password, userPresent.password);

  if (!passwordMatch) {
    res.status(401).json({ error: "wrong user credentials" });
    return;
  }

  const token = createToken(username, SECRET);

  res.cookie("token", token);
  res.status(200).json({ success: "you are logged in" });
});

app.get("/questions", checkLoggedIn, function (req, res) {
  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!");
});

app.get("/submissions", function (req, res) {
  // return the users submissions for this problem
  res.send("Hello World from route 4!");
});

app.post("/submissions", function (req, res) {
  // let the user submit a problem, randomly accept or reject the solution
  // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!");
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
