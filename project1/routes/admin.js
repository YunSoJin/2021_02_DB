// 데이터 수정 기능을 구현
// 필요한 묘듈 inport, 값을 불러오고, 수정하는 기능 모두가 필요하다.
import express from "express"; 
import { selectSql, deleteSql, updateSql, insertSql } from "../database/sql";

// express의 Router함수 사용
const router = express.Router();


router.get('/', async (req, res) => {
   // delete.hbs와 연동
   res.render('admin', {
   })
}); 
router.post('/', async (req, res) => {
    
});


// airport
router.get('/airport', async function (req, res) {
   const airport = await selectSql.getAirport();  
   res.render('airport', {
       title: "Airport", 
       airport
   });
});
router.get('/airport/insert', (req, res) => {
    res.render('airportinsert'); 
});
router.post('/airport/insert', (req, res) => {
    const vars = req. body; 
    const data = {
        Airport_code:vars.Airport_code,
        City:vars.City,
        Name:vars.Name
    };
    insertSql.setAirport (data); 
    res.redirect('/admin/airport/insert');

});
router.get('/airport/delete', async (req, res) => {
   const airport = await selectSql.getAirport(); 
   res.render('airportdelete', {
       title: "Airport 삭제", 
       airport
   })
}); 
router.post('/airport/delete', async (req, res) => {
    console.log('delete router: ', req.body.delBtn);
   const data = {
       Airport_code: req.body.delBtn,
   };
   await deleteSql.deleteAirport(data);
   res.redirect('/admin/airport/delete');
});
router.get('/airport/update', async (req, res) => {
   const airport = await selectSql.getAirport(); 
   res.render('airportupdate', {
       title: "Airport 수정", 
       airport
   })
}); 
router.post('/airport/update', async (req, res) => {
    const vars = req. body; 
    const data = {
        Airport_code:vars.Airport_code,
        City:vars.City,
        Name:vars.Name
    };
    await updateSql.updateAirport(data);
   res.redirect('/admin/airport');   
});


//airplane
router.get('/airplane', async function (req, res) {
   const airplane = await selectSql.getAirplane();  
   res.render('airplane', {
       title: "Airplane", 
       airplane
   });
});
router.get('/airplane/insert', (req, res) => {
    res.render('airplaneinsert'); 
});
router.post('/airplane/insert', (req, res) => {
    const vars = req. body; 
    const data = {
        Airplane_id:vars.Airplane_id,
        Airplane_type:vars.Airplane_type
    };
    insertSql.setAirplane (data); 
    res.redirect('/admin/airplane/insert');

});
router.get('/airplane/delete', async (req, res) => {
   const airplane = await selectSql.getAirplane(); 
   res.render('airplanedelete', {
       title: "Airplane 삭제", 
       airplane
   })
}); 
router.post('/airplane/delete', async (req, res) => {
    console.log('delete router: ', req.body.delBtn);
   const data = {
       Airplane_id: req.body.delBtn,
   };
   await deleteSql.deleteAirplane(data);
   res.redirect('/admin/airplane/delete');
});
router.get('/airplane/update', async (req, res) => {
   const airplane = await selectSql.getAirplane(); 
   res.render('airplaneupdate', {
       title: "Airplane 수정", 
       airplane
   })
}); 
router.post('/airplane/update', async (req, res) => {
    const vars = req. body; 
    const data = {
        Airplane_id:vars.Airplane_id,
        Airplane_type:vars.Airplane_type
    };
    await updateSql.updateAirplane(data);
   res.redirect('/admin/airplane');   
});





//flight
router.get('/flight', async function (req, res) {
   const flight = await selectSql.getFlight();  
   res.render('flight', {
       title: "Flight", 
       flight
   });
});
router.get('/flight/insert', (req, res) => {
    res.render('flightinsert'); 
});
router.post('/flight/insert', (req, res) => {
    const vars = req. body; 
    const data = {
        Number:vars.Number,
        Airline:vars.Airline
    };
    insertSql.setFlight (data); 
    res.redirect('/admin/flight/insert');

});
router.get('/flight/delete', async (req, res) => {
   const flight = await selectSql.getFlight(); 
   res.render('flightdelete', {
       title: "Flight 삭제", 
       flight
   })
}); 
router.post('/flight/delete', async (req, res) => {
    console.log('delete router: ', req.body.delBtn);
   const data = {
       Number: req.body.delBtn,
   };
   await deleteSql.deleteFlight(data);
   res.redirect('/admin/flight/delete');
});
router.get('/flight/update', async (req, res) => {
   const flight = await selectSql.getFlight(); 
   res.render('flightupdate', {
       title: "Flight 수정", 
       flight
   })
}); 
router.post('/flight/update', async (req, res) => {
    const vars = req.body; 
    const data = {
        Number:vars.Number,
        Airline:vars.Airline
    };
    await updateSql.updateFlight(data);
   res.redirect('/admin/flight');   
});




//flight_leg
router.get('/flightleg', async function (req, res) {
    const flightleg = await selectSql.getFlightleg();  
    res.render('flightleg', {
        title: "Flight Leg", 
        flightleg
    });
 });
 router.get('/flightleg/insert', async function (req, res) {
    const airport = await selectSql.getAirport();
    const flight = await selectSql.getFlight();  
    res.render('flightleginsert', {
        title1:"Airport",
        title2: "Flight", 
        airport,
        flight
    }); 
 });
 router.post('/flightleg/insert', (req, res) => {
     const vars = req. body; 
     const data = {
         Leg_no:vars.Leg_no,
         FLIGHT_Number:vars.FLIGHT_Number,
         Departure_Airport_code:vars.Departure_Airport_code,
         Arrival_Airport_code:vars.Arrival_Airport_code,
         Departure_time:vars.Departure_time,
         Arrival_time:vars.Arrival_time
     };
     insertSql.setFlightleg (data); 
     res.redirect('/admin/flightleg/insert');
 
 });
 router.get('/flightleg/delete', async (req, res) => {
    const flightleg = await selectSql.getFlightleg(); 
    res.render('flightlegdelete', {
        title: "Flight Leg 삭제", 
        flightleg
    })
 }); 
 router.post('/flightleg/delete', async (req, res) => {
     console.log('delete router: ', req.body.delBtn);
    const data = {
        Leg_no: req.body.delBtn,
    };
    await deleteSql.deleteFlightleg(data);
    res.redirect('/admin/flightleg/delete');
 });
 router.get('/flightleg/update', async function (req, res) {
    const airport = await selectSql.getAirport();
    const flight = await selectSql.getFlight();  
    const flightleg = await selectSql.getFlightleg(); 
    res.render('flightlegupdate', {
        title: "Flight Leg 수정", 
        title1:"Airport",
        title2: "Flight",
        flightleg,
        airport,
        flight
    })
 }); 
 router.post('/flightleg/update', async (req, res) => {
     const vars = req.body; 
     const data = {
        Leg_no:vars.Leg_no,
        FLIGHT_Number:vars.FLIGHT_Number,
        Departure_Airport_code:vars.Departure_Airport_code,
        Arrival_Airport_code:vars.Arrival_Airport_code,
        Departure_time:vars.Departure_time,
        Arrival_time:vars.Arrival_time
     };
     await updateSql.updateFlightleg(data);
    res.redirect('/admin/flightleg');   
 });




//leg_instance
router.get('/leginst', async function (req, res) {
    const leginst = await selectSql.getLeginst();  
    res.render('leginst', {
        title: "leginst", 
        leginst
    });
 });
 router.get('/leginst/insert', async function (req, res) {
    const flightleg = await selectSql.getFlightleg();
    const airplane = await selectSql.getAirplane();  
    res.render('leginstinsert', {
        title1:"Flight Leg",
        title2: "Airline", 
        flightleg,
        airplane
    }); 
 });
 router.post('/leginst/insert', (req, res) => {
     const vars = req. body; 
     const data = {
         Date:vars.Date,
         Airplane_id:vars.Airplane_id,
         Leg_number:vars.Leg_number,
         FLIGHT_Number:vars.FLIGHT_Number,
         Departure_Airport_code:vars.Departure_Airport_code,
         Arrival_Airport_code:vars.Arrival_Airport_code,
         Dep_time:vars.Dep_time,
         Arr_time:vars.Arr_time
     };
     insertSql.setLeginst (data); 
     res.redirect('/admin/leginst/insert');
 
 });
 router.get('/leginst/delete', async (req, res) => {
    const leginst = await selectSql.getLeginst(); 
    res.render('leginstdelete', {
        title: "Leg Instance 삭제", 
        leginst
    })
 }); 
 router.post('/leginst/delete', async (req, res) => {
     console.log('delete router: ', req.body.delBtn);
    const data = {
        Leg_number: req.body.delBtn,
    };
    await deleteSql.deleteLeginst(data);
    res.redirect('/admin/leginst/delete');
 });
 router.get('/leginst/update', async function (req, res) {
    const flightleg = await selectSql.getFlightleg();
    const airplane = await selectSql.getAirplane();  
    const leginst = await selectSql.getLeginst();
    res.render('leginstupdate', {
        title: "Leg Instance 수정",
        title1:"Flight Leg",
        title2: "Airline",
        leginst, 
        flightleg,
        airplane
    });
 }); 
 router.post('/leginst/update', async (req, res) => {
     const vars = req.body; 
     const data = {
        Date:vars.Date,
         Airplane_id:vars.Airplane_id,
         Leg_number:vars.Leg_number,
         FLIGHT_Number:vars.FLIGHT_Number,
         Departure_Airport_code:vars.Departure_Airport_code,
         Arrival_Airport_code:vars.Arrival_Airport_code,
         Dep_time:vars.Dep_time,
         Arr_time:vars.Arr_time
     };
     await updateSql.updateLeginst(data);
    res.redirect('/admin/leginst');   
 });


module.exports = router;



