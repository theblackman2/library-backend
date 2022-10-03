const authorsRouter = require("express").Router();
const mysqlConnexion = require("./../databases/mysql.js");

authorsRouter.get("/", (req, res) => {
  mysqlConnexion.query("SELECT * FROM Author", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

authorsRouter.get("/news", (req, res) => {
  mysqlConnexion.query("SELECT * FROM Author LIMIT 10", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

authorsRouter.get("/:id", (req, res) => {
  const id = req.params.id;

  mysqlConnexion.query(`SELECT * FROM Author WHERE id=${id}`, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

authorsRouter.get("/:id/books", (req, res) => {
  const id = req.params.id;

  mysqlConnexion.query(
    `SELECT * FROM all_books WHERE author_id=${id} ORDER BY title`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

module.exports = authorsRouter;
