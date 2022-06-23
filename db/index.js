"use strict";

const { Pool } = require("pg");
const { DB } = require("../config");

const pool = new Pool({
  user: "zishan",
  host: "localhost",
  database: "e_commerce_api",
  password: null,
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
