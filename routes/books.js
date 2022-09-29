const booksRouter = require("express").Router();
const mysqlConnexion = require("./../databases/mysql.js");

booksRouter.get("/", (req, res) => {
  mysqlConnexion.query(
    "SELECT * FROM all_books ORDER BY title",
    (err, rows, fileds) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

module.exports = booksRouter;
