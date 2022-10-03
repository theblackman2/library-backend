const publishersRouter = require("express").Router();
const mysqlConnexion = require("./../databases/mysql.js");

publishersRouter.get("/", (req, res) => {
  mysqlConnexion.query("SELECT * FROM Publisher", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

publishersRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  mysqlConnexion.query(
    `SELECT * FROM Publisher WHERE id=${id}`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

publishersRouter.get("/:id/books", (req, res) => {
  const id = req.params.id;
  mysqlConnexion.query(
    `SELECT * FROM all_books WHERE publisher_id=${id}`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

module.exports = publishersRouter;
