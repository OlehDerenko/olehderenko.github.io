const postgres = require("postgres");
const dbConfig = require("./config");

const sql = postgres(
  "postgres://postgres:tk1701kep@localhost:5432/school",
  dbConfig
);

module.exports = sql;
