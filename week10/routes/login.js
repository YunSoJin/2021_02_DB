// views 폴더의 home.hbs 파일과 연동, 홈 화면 기능 구현.
// 사용할 모듈들 추가
import express from "express"; 
import { selectSql } from "../database/sql";

// expree의 Router를 router라는 객체로 사용할 것을 명명
const router = express.Router();

// login.hbs와 연동되어 있는 부분.
router.get('/', (req, res) => {
    res.render('login'); 
});

// insert 버튼이 눌렸을 때 실행
router.post('/', async(req, res) => {
    // req의 body를 vars라는 객체로 생성. 데이터를 넘기면 req.body에 저장.
    const vars = req. body; 
    // users는 selectSql의 getUsers을 통해 모든 user의 정보를 가져와 저장한다.
    const users = await selectSql.getUsers();
    // 변수 저장은 let으로 한다. 어떤 user인지 저장하는 whoAmI와, 로그인상태를 나타내는 checkLogin 변수를 만든다.
    let whoAmI ='';
    let checkLogin =false;

    // 옛 문법
    // for(let i=0;i<users.length;i++){
    //     console.log('for loop',users[i].Id);
    // }

    // user의 정보를 모두 돌면서 입력받은 user의 정보와 일치하는지 살펴본다.
    users.map((user)=>{
        // 콘솔 창에 user.id를 모두 출력한다.
        console.log(user.Id);
        // 입력받은 데이터(vars)의 id와 password가 user의 id와 password가 일치하면 if문의 조건을 만족한다.
        if(vars.id === user.Id && vars.password === user.Password){
            // 콘솔 창에 login success 메시지를 출력한다.
            console.log('login success!');
            // 로그인 상태는 true가 된다.
            checkLogin =true;
            // 아이디가 admin이면 whoAmI가 admin이다.
            if(vars.id ==='admin'){
                whoAmI='admin';
            }
            // 아이디가 test라면 whoAmI가 user이다.
            else{
                whoAmI='user';
            }
        }

    })

    // login이 되었고 user가 admin일때는 /delete 페이지로 이동한다.
    if(checkLogin && whoAmI ==='admin'){
        res.redirect('/delete');
    } 
    // login이 되었고 user의 이름이 user일 때는 /select 페이지로 이동한다. 
    else if(checkLogin && whoAmI ==='user'){
        res.redirect('/select');
    } 
    // 위의 경우에 모두 해당하지 않는다면, 콘솔에 login failed를 출력하고, 웹페이지에는 '로그인에 실패하였습니다' 라는 문구를 출력하는 창을 띄운다.
    else{
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패하였습니다.'); location.href='/';</script>");
    }

})

module.exports = router;
