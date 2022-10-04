const authRouter = require("express").Router();
const { compare, encrypt } = require("../utils/encryptPassword");
const asyncQuery = require("../utils/mysqlAsync");
const mysqlConnexion = require("./../databases/mysql");

authRouter.use((req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      type: "Error",
      message: "The email and password are required",
    });
  } else {
    next();
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email="${email}"`;
  const user = await asyncQuery(query);
  if (user.length <= 0) {
    res.status(404).json({
      type: "Error",
      message: "The credencials provided doesn't match a stored user",
    });
  } else {
    const hashedPassword = user[0].password;

    const match = await compare(password, hashedPassword);

    if (!match)
      res.status(403).json({
        type: "Error",
        message: "The password provided is not correct",
      });
    else res.status(200).send("The user is loged in");
  }
});

authRouter.use((req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      type: "Error",
      message: "The name, email and password are required",
    });
  } else {
    next();
  }
});

authRouter.use(async (req, res, next) => {
  const { email } = req.body;
  const query = `SELECT * FROM users WHERE email="${email}"`;
  const userMatch = await asyncQuery(query);
  if (userMatch.length > 0)
    res.json({
      type: "Error",
      message: "The users is already registered, login in with credentials",
    });
  else next();
});

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await encrypt(password);

  const query = `INSERT INTO users(name, email, password) VALUES("${name}", "${email}", "${hashedPassword}")`;
  const insert = asyncQuery(query);

  insert
    .then(() =>
      res.status(201).json({
        type: "success",
        message: "User registered and loged in",
      })
    )
    .catch((err) => {
      throw err;
    });
});

module.exports = authRouter;
