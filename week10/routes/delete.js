// 데이터 수정 기능을 구현
// 필요한 묘듈 inport, 값을 불러오고, 수정하는 기능 모두가 필요하다.
import express from "express"; 
import { selectSql, deleteSql } from "../database/sql";

// express의 Router함수 사용
const router = express.Router();

// 기존의 department, course 입력 값 불러오기
router.get('/', async (req, res) => {
     //selectsql에서 getDepartment에 데이터를 불러와서 department에 저장.
    const department = await selectSql.getDepartment(); 
    //selectsql에서 getCourse에 데이터를 불러와서 course에 저장.
    const course = await selectSql.getCourse(); 
    // delete.hbs와 연동
    res.render('delete', {
        // 테이블 제목, 불러올 값
        // 불러올 테이블을 먼저 다 명명하고, 각각의 테이블에 불러올 값을 적는다.
        title: "삭제 기능", 
        title2: "과목 삭제",
        department,
        course
    })
}); 


router.post('/', async (req, res) => {
    // 콘솔 창에 삭제되기로 한 행의 반환값을 출력한다.
    console.log('delete router: ', req.body.delBtn);

    const data = {
        // dnumber 또는 Cnumber 삭제
        Dnumber: req.body.delBtn,
        Cnumber: req.body.delBtn
    };
    // delete query를 실행하기 위해 deleteSql의 deleteDepartment 또는 deleteCourse를 불러온다.
    // data가 Dnumber 또는 Cnumber만 저장될 것이므로, query문을 동시에 적어도 한쪽에서만 삭제가 일어난다.
    await deleteSql.deleteDepartment(data);
    await deleteSql.deleteCourse(data);
    // query가 끝나면 다시 delete 페이지로 이동
    res.redirect('/delete');
});
module.exports = router;
