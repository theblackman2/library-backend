const mysqlConnexion = require("./../databases/mysql.js");
const commentsRouter = require("express").Router();

commentsRouter.get("/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  mysqlConnexion.query(
    `SELECT * FROM Comment WHERE book_id=${bookId}`,
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

commentsRouter.post("/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const content = req.body.content;
  let error = false;

  if (!content) {
    error = true;
    res.json({
      type: "Error",
      message: "The message body must containt something",
    });
  } else {
    // mysqlConnexion.query(
    //   `SELECT * FROM all_books WHERE id=${bookId}`,
    //   (err, rows) => {
    //     if (err) throw err;
    //     if (rows.length == 0) {
    //       res.json({
    //         type: "Error",
    //         message: "There is no book with the id provided",
    //       });
    //     }
    //   }
    // );
  }

  if (!error) {
    mysqlConnexion.query(
      `INSERT INTO Comment(content, book_id) values("${content}", "${bookId}")`,
      (err) => {
        if (err) throw err;
      }
    );
    res.json({
      type: "Success",
      message: "Comment created",
    });
  }
});

module.exports = commentsRouter;
