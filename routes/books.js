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

booksRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  mysqlConnexion.query(
    `SELECT * FROM all_books WHERE id=${id}`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

module.exports = booksRouter;
