const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || "rds-demo.cr7z6ni9cc0v.us-east-1.rds.amazonaws.com",
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "01635413214",
    database: process.env.DB_NAME || "kpremium",
    port: process.env.DB_PORT || 3306
  },
  pool: {min: 0, max: 50}
});

module.exports = knex;
