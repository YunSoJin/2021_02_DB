// 데이터 베이스 접속 및 insert, update, select 기능 구현
// mysql2 모듈 import
import mysql from "mysql2";

// 디에터베이스 연결
const pool = mysql.createPool( 
    process.env. JAWSDB_URL ?? {
        host: 'localhost', 
        user: 'root', 
        database: 'project', 
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
    getAirport : async () => {
        const [rows] = await promisePool.query(`select * from airport`); 
         return rows
    },
    getAirplane : async() => {
        const [rows] = await promisePool.query(`select * from airplane`);
        return rows
    },
    getFlight : async() => {
        const [rows] = await promisePool.query(`select * from flight`);
        return rows
    },
    getFlightleg : async() => {
        const [rows] = await promisePool.query(`select * from flight_leg`);
        return rows
    },
    getLeginst : async() => {
        const [rows] = await promisePool.query(`select * from leg_instance`);
        return rows
    },
    getUser : async(data) => {
        const [rows] = await promisePool.query(`select R.Date,D.name AS Departure_Airport, S.name AS Arrival_airport, L.Dep_time,L.Arr_time,R.Seat
        from reservation as R, leg_instance AS L, airport AS D, airport AS S
        where user_id=${data.User_id} AND R.Leg_number=L.Keg_number AND R.Date=L.Date AND R.FLIGHT_Number=L.Flight_Number
        L.Depature_Airport_code=D.Airport_code AND L.Arrival_Airport_code=S.Airport_code `);
        return rows
    },
    getRes : async() => {
        const [rows] = await promisePool.query(`select * from res`);
        return rows
    },

}

// insert query 
export const insertSql = { 
    setAirport : async (data) => {
        const sql = `insert into airport values (
            "${data.Airport_code}", "${data.City}", "${data.Name}" )`;
            await promisePool.query(sql);
    },
    setAirplane : async (data) => {
        const sql = `insert into airplane values (
            "${data.Airplane_id}", "${data.Airplane_type}" )`;
            await promisePool.query(sql);
    },
    setFlight : async (data) => {
        const sql = `insert into flight values (
            "${data.Number}", "${data.Airline}")`;
            await promisePool.query(sql);
    },
    setFlightleg : async (data) => {
        const sql = `insert into flight_leg values (
            "${data.Leg_no}", "${data.FLIGHT_Number}", "${data.Departure_Airport_code}","${data.Arrival_Airport_code}","${data.Departure_time}","${data.Arrival_time}")`;
            await promisePool.query(sql);
    }, 
    setLeginst : async (data) => {
        const sql = `insert into leg_instance values (
            "${data.Date}","${data.Airplane_id}","${data.Leg_number}", "${data.FLIGHT_Number}", 
            "${data.Departure_Airport_code}","${data.Arrival_Airport_code}","${data.Dep_time}","${data.Arr_time}")`;
            await promisePool.query(sql);
    },  
    
    /*setUser : async (data) => {
        const sql = `insert into reservation values (Seat,User_id,Date,Leg_Number,FLIGHT_Number)
                    SELECT 

            "${data.Date}","${data.Airplane_id}","${data.Leg_number}", "${data.FLIGHT_Number}", 
            "${data.Departure_Airport_code}","${data.Arrival_Airport_code}","${data.Dep_time}","${data.Arr_time}")`;
            await promisePool.query(sql);
    }, */ 
    
    
}

//delete query 
export const deleteSql = { 

    deleteAirport : async (data) => {
        const sql = `delete from airport where Airport_code = ${data.Airport_code}`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },
    deleteAirplane : async (data) => {
        const sql = `delete from airplane where Airplane_id = ${data.Airplane_id}`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },
    deleteFlight : async (data) => {
        const sql = `delete from flight where Number = ${data.Number}`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },
    deleteFlightleg : async (data) => {
        const sql = `delete from flight_leg where Leg_no = ${data.Leg_no}`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },
    deleteLeginst : async (data) => {
        const sql = `delete from leg_instance where Leg_number = ${data.Leg_number}`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },
    deleteUser : async (data) => {
        const sql = `delete from reservation where User_id=${data.User_id}AND Seat = ${data.Seat}`; 
        // query문을 다 수행할 때까지 기다림
        await promisePool.query(sql);
    },

  
}

// update query 
export const updateSql = { 
    updateAirport : async (data) => { 
        const sql = `update airport set City = "${data.City}", Name ="${data.Name}" where Airport_code = ${data.Airport_code}`; 
        await promisePool.query(sql);

    },
    updateAirplane : async (data) => { 
        const sql = `update airplane set Airplane_type = "${data.Airplane_type}" where Airplane_id = ${data.Airplane_id}`; 
        await promisePool.query(sql);

    },
    updateFlight : async (data) => { 
        const sql = `update flight set Airline = "${data.Airline}" where Number = ${data.Number}`; 
        await promisePool.query(sql);

    },
    updateFlightleg : async (data) => { 
        const sql = `update flight_leg set FLIGHT_Number = "${data.FLIGHT_Number}", Departure_Airport_code="${data.Departure_Airport_code}",
        Arrival_Airport_code="${data.Arrival_Airport_code}", Departure_time="${data.Departure_time}", Arrival_time="${data.Arrival_time}"
        where Leg_no = ${data.Leg_no}`; 
        await promisePool.query(sql);
    },
    updateLeginst : async (data) => { 
        const sql = `update leg_instance set Airplane_id ="${data.Airplane_id}", FLIGHT_Number = "${data.FLIGHT_Number}", 
        Departure_Airport_code="${data.Departure_Airport_code}", Arrival_Airport_code="${data.Arrival_Airport_code}", Dep_time="${data.Dep_time}", Arr_time="${data.Arr_time}"
        where Date = "${data.Date}" AND Leg_number =${data.Leg_number}`; 
        await promisePool.query(sql);
    },


}



