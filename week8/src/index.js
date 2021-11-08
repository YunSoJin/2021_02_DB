// import는 쓰려는 모듈을 불러온다. " "에 있는 모듈이 불러오는 모듈이고 
// import 뒤에는 불러온 모듈을 파일 내에서 어떤 이름으로 부를 것인지 이다.
import express from "express"; 
import logger from "morgan"; 
import path from "path";

// 현재 폴더 위치를 기준으로 하여 만든 모듈을 불러오는 부분이다.
import homeRouter from "../routes/home"; 
import updateRouter from "../routes/update"; 
import selectRouter from "../routes/select";

// 포트 번호는 3000번으로 한다.
const PORT = 3000;

// app는 객체이름, express라는 기능을 app이라는 객체로 쓰겠다는 의미.
const app = express();

// object 데이터를 다루기 편하게 하디 위해 추가
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

// hbs를 사용하겠다.
app.set('views', path.join(__dirname, '../views')) 
app.set('view engine', 'hbs')

// logger 자세히 보기 위해 사용
app.use(logger("dev"));

// 기본적인 louter 주소
app.use('/', homeRouter); 
app.use('/update', updateRouter); 
app.use('/select', selectRouter);

// listen은 서버를 실행하겠다는 의미. npm run start를 하면 서버 실행됨.
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
