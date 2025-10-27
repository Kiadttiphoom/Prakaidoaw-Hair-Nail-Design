import mysql from "mysql2/promise";

if (!global._mysqlPool) {
  global._mysqlPool = mysql.createPool({
    uri: process.env.MYSQL_URI,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export const mysqlPool = global._mysqlPool;
