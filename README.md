# 2021_02_database

## 3주차 실습 실행 방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    -(SSH로 설정한 경우) git clone git@github.com:mskin1024/2021-02-database.git
    -(token을 사용하는 경우) git clone https://github.com.mskim1024/2021-02-database.git
2. week3 폴더로 이동
    > cd week3
3. 콘솔창(powershell)에서 npm package 설치
    > npm install
4. database/sql.js 에서 본인의 데이터베이스 정보 입력 (주석 부분)
<pre>
<code>
const pool = musql.createPool(
    process.env.JAWSDB_URL ??{
        host:'localhost',
        user:'root', // 본인의 mysql user id
        database: 'tutorial', // 본인이 만든 데이터베이스 이름
        password: 'password', // 본인의 musql password
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);
</code>
</pre>

<br>

## <span style="color:red">테이블 작성법</span>
이름|과|전공|학번
---|---|---|---|
김영희|정보통신공학과|정보통신|12201111|
홍길동|컴퓨터공학과|데이터베이스|12191111|
이순신|인공지능공학과|인공지능|12181111|

## 텍스트 강조
- **데이터베이스** 실습은 재미 ~~없어요~~있어요.

<br><br><br>

## 3주차 실습 설명
1. student 테이블 생성
<pre>
<code>
CREATE TABLE STUDENT(ID INTEGER NOT NULL,
    Name VARCHAR(30) NOT NULL,
    Department VARCHAR(20) NOT NULL,
    Grade INTEGER NOT NULL,
    AdmissionDate DATETIME NOT NULL,
    Email VARCHAR(20) NOT NULL,
    PRIMARY KEY(ID));
</code>
</pre>
학생에서 필요한 attribute는 ID, Name, Department, Grade, AdmissionDate, Email이다. 이 중에서 학생들을 유일하게 구별할 수 있는 것은 ID이므로 이를 PK로 지정한다.
<br>
ID와 Grade는 숫자로만 지정하므로 Interger type, Name과 Department, Email은 string이지만 길이가 가변적이므로 VARCHAR type, AdmissionDate는 날짜를 나타내므로 Datetime type으로 한다.
<br><br>

2. 테이블에 값 삽입
 <pre>
<code>
insert into student values(12123456, ‘김철수’, ’정보통신공학과’, 4, ’2012-03-01 00:00:00’, ’12123456@gmail.com’);
insert into student values(12211234, ‘홍길동’, ’정보통신공학과’, 4, ’2021-03-01 00:00:00’, ’1221134@gmail.com’);
</code>
</pre>
최종적인 table은 다음과 같다.

ID|Name|Department|Grade|AdmissionDate|Email
---|---|---|---|---|---|
12123456|김철수|정보통신공학과|4|2012-03-01 00:00:00|12123456@gmail.com|
12211234|홍길동|정보통신공학과|4|2021-03-01 00:00:00|1221134@gmail.com|

<br><br><br>

## 8주차 실습 설명
8주차 실습은 테이블만 MySQL에서 만들고, insert는 만든 웹페이지에서 실행하였다.
1. Employee 테이블
 <pre>
<code>
CREATE TABLE EMPLOYEE
( Fname           VARCHAR(10)   NOT NULL,
  Minit           CHAR,
  Lname           VARCHAR(20)      NOT NULL,
  Ssn             CHAR(9)          NOT NULL,
  Bdate           DATE,
  Address         VARCHAR(30),
  Sex             CHAR(1),
  Salary          DECIMAL(5),
  Super_ssn       CHAR(9),
  Dno             INT               NOT NULL,
PRIMARY KEY   (Ssn));
</code>
</pre>
Employee 테이블의 attribute는 다음과 같다. 이름인 Fname, 중간 이름의 이니셜인 Minit, 성인 Lname, 사원 번호인 Ssn, 생일인 Bdate, 주소인 Address, 성별인 Sex, 월급인 Salary, 상사의 사번인 Super_ssn, 소속 부서 번호인 Dno이다. 사원을 구별하기 위해서는 중복되지 않는 정보인 Ssn을 PK로 한다. <br> Minit과 Ssn, Sex, Super_ssn은 string의 길이가 정해져 있으므로 Char type이다. 가변적인 길이를 가지는 Fname, Lname, Address는 Varchar type이다. Bdate는 년월일을 저장해야 하므로 Date, Salary는 소수점을 표현해야 하므로 Decimal, Dno는 숫자만 저장하면 되므로 Int type이다. <br> 이름과 성, 사번, 소속 부서 번호는 비우면 안되는 정보이므로 Not null이다. 상사의 사번이 null이 허용되는 이유는 회장 등의 최고 위치에 있는 경우 상사가 없기 때문이다.
<br><br> 값이 들어가기 전 테이블의 형태는 다음과 같다.

Fname|Minit|Lname|Ssn|Bdate||Address|Sex|Salary|Super_ssn|Dno
---|---|---|---|---|---|---|---|---|---|---|

<br><br>

2. Department 테이블
 <pre>
<code>
CREATE TABLE DEPARTMENT
( Dname           VARCHAR(15)       NOT NULL,
  Dnumber         INT               NOT NULL,
  Mgr_ssn         CHAR(9)           NOT NULL,
  Mgr_start_date  DATE,
PRIMARY KEY (Dnumber),
UNIQUE      (Dname),
FOREIGN KEY (Mgr_ssn) REFERENCES EMPLOYEE(Ssn) );
</code>
</pre>
Department 테이블의 attribute는 부서 이름인 Dname, 부서 번호인 Dnumber, 부서를 관리하는 사원의 번호인 Mgr_ssn, 부서가 시작한 날짜인 Mgr_start_date이다. 부서를 구별하기 위해서 중복되지 않는 정보인 Dnumber를 PK로 한다. Dname 역시 이름이 같은 부서가 없게 하기 위해 Unique로 설정한다. Mgr_ssn의 정보는 Employee 테이블의 Ssn을 참조한다. 따라서 FK로 설정한다. 부서의 이름, 번호, 관리 사원의 정보는 비워둘 수 없다. 따라서 NOT NULL로 설정한다. <br> Dname은 부서별로 이름의 길이가 가변적이므로 VARCHAR, Dnumber은 정수형으로 저장하므로 INT, Mgr_ssn은 ssn와 동일하게 CHAR, Mgr_start_date는 날짜를 저장해야 하므로 DATE type로 한다.
<br><br> 값이 들어가기 전 테이블의 형태는 다음과 같다.

Dname|Dnumber|Mgr_ssn|Mgr_start_date
---|---|---|---|


<br><br><br>

## 10주차 실습 설명

1. user 테이블
user 테이블은 로그인 페이지에서 user을 구별하기 위해 만든 테이블이다.
<pre>
<code>
CREATE TABLE USER
( Id VARCHAR(20) NOT NULL,
 Password VARCHAR(20) NOT NULL,
 Role VARCHAR(5) NOT NULL,
 PRIMARY KEY (id));
</code>
</pre>

Id|Password|Role
---|---|---|
admin|admin1234|admin|
test|test1234|test

Id와 Password, Role 모두 string이 가변적이므로 VARCHAR로 만들었다. 그리고 3개의 attribute 모두 null을 혀용하지 않는다. user의 key는 중복되지 않는 Id로 한다. 로그인 페이지에서 Id와 Password를 입력하면 user 테이블에서 입력한 값과 비교한 뒤 admin이라면 delete 페이지로, test라면 select 페이지로 이동한다.

<br><br>

2. department 테이블
학과와 학과 번호를 저장하기 위한 테이블이다.
<pre>
<code>
CREATE TABLE DEPARTMENT
( Dname VARCHAR(15) NOT NULL,
  Dnumber INT NOT NULL,
PRIMARY KEY (Dnumber),
UNIQUE      (Dname));
</code>
</pre>

Dname|Dnumber
---|---|
전기공학과|2|
전자공학과|3|
정보통신공학과|0|
컴퓨터공학과|1|

학과의 이름인 Dname, 학과 번호인 Dnumber를 attribute로 가진다. 학과 이름은 이름이 가변적이므로 VARCHAR, 학과 번호는 정수만 저장하므로 INT 형으로 한다. 두 attribute 모두 null을 허용하지 않는다. Department의 key는 중복되지 않는 Dnumber로 한다.
