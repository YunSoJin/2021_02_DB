// 데이터 베이스 접속 및 insert, update, select 기능 구현
// mysql2 모듈 import
import mysql from "mysql2";

// 디에터베이스 연결
const pool = mysql.createPool( 
    process.env. JAWSDB_URL ?? {
        host: 'localhost', 
        user: 'root', 
        database: 'week10', 
        password: '1234', 
        waitForConnections: true, 
        connectionLimit: 10, 
        queuelimit: 0
    }
);

// async / await 문 사용
const promisePool = pool.promise();

// select query 
export const selectSql = {
    // employee의 data를 자기고 옴
    getUsers : async () => {
         // 'select * from user' query를 실행해 rows에 저장.
         // query문을 다 수행할 때까지 기다림
        const [rows] = await promisePool.query(`select * from user`); 
        console.log(rows) 
         return rows
    },
    // department의 data를 가지고 옴
    getDepartment : async() => {
        // 'select * from department' query를 실행해 rows에 저장.
        // query문을 다 수행할 때까지 기다림
        const [rows] = await promisePool.query(`select * from department`);
        return rows
    },
    getCourse : async() => {
        // 'select * from course' query를 실행해 rows에 저장.
        // query문을 다 수행할 때까지 기다림
        const [rows] = await promisePool.query(`select * from course`);
        return rows
    },

}

// delete query 
export const deleteSql = { 

    deleteDepartment : async (data) => {
        console.log('deleteSql.deleteDepartment: ', data.Dnumber);
        const sql = `delete from department where Dnumber = ${data.Dnumber}`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },

    deleteCourse : async (data) => {
        console.log('deleteSql.deleteCourse: ', data.Cnumber);
        const sql = `delete from course where Cnumber = ${data.Cnumber}`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },
}


