const pool = require('../config/db');

module.exports = {
  query: (sql, params) => pool.query(sql, params),
  pool
};
