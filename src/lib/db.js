import mysql from "mysql2";

export const mysqlPool = mysql.createPool(process.env.MYSQL_URI, {
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
