// views 폴더의 home.hbs 파일과 연동, 홈 화면 기능 구현.
// 사용할 모듈들 추가
import express from "express"; 
import { insertSql } from "../database/sql";

// expree의 Router를 router라는 객체로 사용할 것을 명명
const router = express.Router();

// home.hbs와 연동되어 있는 부분.
router.get('/', (req, res) => {
    res.render('home'); 
});

// insert 버튼이 눌렸을 때 실행
router.post('/', (req, res) => {
    // req의 body를 vars라는 객체로 생성. 데이터를 넘기면 req.body에 저장.
    const vars = req. body; 
    // 넘어온 값의 개수를 var_lenth에 저장.
    const var_lenth = Object.keys(req.body).length;

    // 들어오는 데이터가 employee인지 department인지 구분. 데이터의 길이가 4이상이면 employee.
    if (var_lenth > 4) { 
        const data = {
            // 각각의 attribute를 저장.
            Fname: vars.fname, 
            Minit: vars.minit, 
            Lname: vars.lname, 
            Ssn: vars.ssn, 
            Bdate: vars.bdate, 
            Address: vars.address, 
            Sex: vars.sex, 
            Salary: vars.salary, 
            Super_ssn: vars.super_ssn, 
            Dno: vars.dno
        };
        // data를 setEmployee로 넘겨줌
        insertSql.setEmployee (data); 
    } else { const data = {
        // 각각의 attibute에 값을 저장.
            Dname: vars.dname, 
            Dnumber: vars.dnumber, 
            Mgr_ssn: vars.mgr_ssn, 
            Mgr_start_date: vars.mgr_start_date
        };
        // data를 setDepartment로 넘겨준다.
        insertSql.setDepartment (data);
    }
    // 다시 '/' 의 주소로 온다.
    res.redirect('/');

})

module.exports = router;
