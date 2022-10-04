const mysqlConnexion = require("./../databases/mysql");
const asyncQuery = (query) =>
  new Promise((resolve, reject) => {
    mysqlConnexion.query(query, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });

module.exports = asyncQuery;
