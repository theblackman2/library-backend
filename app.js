const express = require("express");
const booksRouter = require("./routes/books.js");
const commentsRouter = require("./routes/comments.js");
const cors = require("cors");
const authorsRouter = require("./routes/authors.js");
const publishersRouter = require("./routes/publishers.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.use("/books", booksRouter);

app.use("/comments", commentsRouter);

app.use("/authors", authorsRouter);

app.use("/publishers", publishersRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
