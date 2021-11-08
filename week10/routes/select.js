// 조회 화면 기능 구현
// 필요한 모듈 추가.
import express from "express"; 
import { selectSql } from "../database/sql";

// express의 ROuter 함수 router의 객체로 저장.
const router = express.Router();

// '/'는 '/select'를 축약해 표현한 것이다.
router.get('/', async function(req, res) {
    // await는 끝날 때까지 기다리라는 뜻.
    //selectsql에서 getDepartment에 데이터를 불러와서 Department에 저장.
    const department = await selectSql.getDepartment();
    //selectsql에서 getCourse에 데이터를 불러와서 Course에 저장.
    const course = await selectSql.getCourse();

    // select.hbs와 연동되어 있는 부분.
    res.render('select', {
        // 각각의 table의 이름을 'IT 공대'와 '과목'으로 한다.
        title: 'IT 공대',
        title2: '과목',
        department,
        course
    });
});

module.exports = router;
