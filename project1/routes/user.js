import express from "express"; 
import { selectSql, deleteSql, updateSql, insertSql } from "../database/sql";

// express의 Router함수 사용
const router = express.Router();


router.get('/', async function (req, res) {
    // const user = await selectSql.getUser(data);
    // res.render('user', {
    //     title: "user Reservation 조회", 
    //     user
    // });
 });
 router.post('/', async function (req, res) {
    const vars = req. body; 
    const data = {
        User_id:vars.User_id,
    };
    const user = await selectSql.getUser(data);
    res.render('user', {
        title: "user Reservation 조회", 
        user
    });
    res.redirect('/');

});

 router.get('/insert', async function (req, res) {
    const rese = await selectSql.getRes();   
    res.render('userinsert', {
        title: "Flight Reservation", 
        rese
    }); 
 });
 router.post('/insert', (req, res) => {
     const vars = req. body; 
     const data = {
         User_id:vars.User_id,
         Date:vars.Date,
         Departure_Airport:vars.Departure_Airport,
         Arrival_Airport:vars.Arrival_Airport,
         Departure_time:vars.Departure_time,
         Arrival_time:vars.Arrival_time,
         Fare:vars.Fare,
         Seat:vars.seat
     };
     insertSql.setUser (data); 
     res.redirect('/insert');
 
 });
router.get('/delete', async (req, res) => {
    const userres = await selectSql.getUser();
    res.render('userdelete', {
       title: "예약 삭제", 
       userres
   })
}); 
router.post('/delete', async (req, res) => {
    console.log('delete router: ', req.body.delBtn);
   const data = {
       User_id:req.body.User_id,
       Seat:req.body.Seat

   };
   await deleteSql.deleteUser(data);
   res.redirect('/delete');
});


module.exports = router;
