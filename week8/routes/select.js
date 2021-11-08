// 조회 화면 기능 구현
// 필요한 모듈 추가.
import express from "express"; 
import { selectSql } from "../database/sql";

// express의 ROuter 함수 router의 객체로 저장.
const router = express.Router();

// '/'는 '/select'를 축약해 표현한 것이다.
router.get('/', async function(req, res) {
    //selectsql에서 getEmployee에 데이터를 불러와서 employee에 저장.
    // await는 끝날 때까지 기다리라는 뜻.
    const employee = await selectSql.getEmployee(); 
    //selectsql에서 getDepartment에 데이터를 불러와서 Department에 저장.
    const department = await selectSql.getDepartment();

    // select.hbs와 연동되어 있는 부분.
    res.render('select', {
        // 각각의 table의 이름을 '직원 테이블'과 '부서 테이블'로 한다.
        title: '직원 테이블', 
        title2: '부서 테이블', 
        employee,
        department 
    });
});

module.exports = router;
