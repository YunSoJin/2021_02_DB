import mysql from "mysql2";

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'yunsojin', // 본인의 mysql user id
    database: 'week3', // 본인이 만든 데이터베이스 이름으로 수정하세요
    password: '1234', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);

const promisePool = pool.promise();

const sql = {

  getUsers : async () => {
    const [rows] = await promisePool.query(`
      SELECT * FROM student
    `)
    
    return rows
  },
}

module.exports = sql