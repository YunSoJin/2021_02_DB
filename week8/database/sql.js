// 데이터 베이스 접속 및 insert, update, select 기능 구현
// mysql2 모듈 import
import mysql from "mysql2";

// 디에터베이스 연결
const pool = mysql.createPool( 
    process.env. JAWSDB_URL ?? {
        host: 'localhost', 
        user: 'root', 
        database: 'week8', 
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
    getEmployee : async () => {
         // 'select * from employee' query를 실행해 rows에 저장.
         // query문을 다 수행할 때까지 기다림
        const [rows] = await promisePool.query(`select * from employee`); 
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
}

// insert query 
export const insertSql = { 
    // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    setEmployee : async (data) => {
        // 테이블의 attribute 순서에 맞춰서 값 insert
        const sql = `insert into employee values (
            "${data.Fname}", "${data.Minit}", "${data.Lname}", "${data.Ssn}", "${data.Bdate}", 
            "${data.Address}", "${data.Sex}", "${data.Salary}", "${data.Super_ssn}", "${data.Dno}" )`;
            // query문을 다 수행할 때까지 기다림
            await promisePool.query(sql);
    },
        
    // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    setDepartment : async (data) => { 
        // 테이블의 attribute 순서에 맞춰서 값 insert
        const sql = `insert into department values (
            "${data.Dname}", "${data.Dnumber}", "${data.Mgr_ssn}", "${data.Mgr_start_date}" )`;
            // query문을 다 수행할 때까지 기다림
            await promisePool.query(sql);
    },
}

// update query 
export const updateSql = { 
    updateEmployee : async (data) => { 
        // Minit가 F인 employee에 대해서 salary를 500으로 수정
        const sql = `update employee set salary = "${data.Salary}" where Minit = "F" OR Lname = "김"`; 
        //  
       // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);

    },
    updateDepartment : async (data) => {
        // dnumber가 0인 department에 대해서 dname을 입력받은 data.Dname으로 update
        const sql = `update department set dname = "${data.Dname}" where Dnumber = 0`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },
}


