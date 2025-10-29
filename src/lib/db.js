const mysql = require("mysql2/promise");
exports.mysqlPool = mysql.createPool(process.env.MYSQL_URI);
