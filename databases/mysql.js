const mysql = require("mysql");

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const database = process.env.MYSQL_DATABASE;

const connexion = mysql.createConnection({
  host,
  user,
  password,
  database,
});

connexion.connect((err) => {
  if (err) throw err;
  console.log("Mysql connected");
});

module.exports = connexion;
