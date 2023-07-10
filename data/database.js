const mysql = require("mysql2/promise");
const HTTP = require("../constants/HTTP");

const pool = mysql.createPool({
  host: "localhost",
  database: "blog",
  user: "root",
  password: HTTP.PASSWORD,
});

module.exports = pool;
