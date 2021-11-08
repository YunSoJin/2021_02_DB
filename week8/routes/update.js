// 데이터 수정 기능을 구현
// 필요한 묘듈 inport, 값을 불러오고, 수정하는 기능 모두가 필요하다.
import express from "express"; 
import { selectSql, updateSql } from "../database/sql";

// express의 Router함수 사용
const router = express.Router();

// 기존의 employee 입력 값 불러오기
router.get('/employee', async (req, res) => {
    // await는 끝날 때까지 기다리라는 뜻.
    //selectsql에서 getEmployee에 데이터를 불러와서 emp_res에 저장.
    const emp_res = await selectSql.getEmployee();
    // updateEmployee.hbs와 연동
    res.render('updateEmployee', {
        //테이블 제목, 불러올 값
        title: "직원 테이블 갱신",
        emp_res 
    }); 
});

// 기존의 department 입력 값 불러오기
router.get('/department', async (req, res) => {
     //selectsql에서 getDepartment에 데이터를 불러와서 dept_res에 저장.
    const dept_res = await selectSql.getDepartment(); 
    // updateDepartment.hbs와 연동
    res.render('updateDepartment', {
        // 테이블 제목, 불러올 값
        title: "부서 테이블 갱신", 
        dept_res
    })
}); 


// '/update/employee' 의 주소에서 employee를 update 한다.
router.post('/employee', async (req, res) => {
    const vars = req.body; 
    console.log(vars.salary);
    const data = {
        // salary만 수정
        Salary: vars.salary
    }
    await updateSql.updateEmployee(data);
    // 조회페이지로 이동
    res.redirect('/select');
});

// '/update/department' 의 주소에서 depaerment를 update 한다.
router.post('/department', async (req, res) => {
    const vars = req.body; 
    console.log(vars.dname);
    const data = {
        // dname만 수정
        Dname: vars.dname
    }
    await updateSql.updateDepartment(data);
    // 조회페이지로 이동
    res.redirect('/select');
});
module.exports = router;
