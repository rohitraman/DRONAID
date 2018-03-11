var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var db = require('../db');

/**
 * @api {get} localhost:3000/makeAppointment Request an appointment
 *
 * @apiDescription Used to request an appointment with a doctor
 *
 * @apiError MakeAppointmentError There was an error during making an appointment. Checks are done sequentially. The first false after success is where the error occurred.
 *
 * @apiErrorExample {json} MakeAppointmentError
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false
 *       "doctorUsernameExistsPassed": true
 *       "doctorAuthPassed": true
 *       "patientUsernameExistsPassed": true
 *       "scheduleFreePassed": false
 *     }
 *
 * @apiExample {curl} Example usage:
 * curl -XGET
 * -H 'Authorization: <JWT token here>'
 * 'localhost:3000/makeAppointment?
 * dUsername=doctor&
 * pUsername=patient&
 * date=<Date Object>&
 * reason=Headache'
 *
 * @apiGroup Make Appointment
 *
 * @apiHeader {String} Authorization Will contain JWT Token given to the user.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "<JWT Token here>"
 *     }
 *
 * @apiName MakeAppointmentRequest
 *
 * @apiParam {String} dUsername Mandatory doctor username.
 * @apiParam {String} pUsername Mandatory patient username.
 * @apiParam {Date} date Mandatory date object containing start time of appointment
 * @apiParam {String} [reason] Reason for appointment. Duration of appointment will be decided by doctor using this.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "dUsername": "doctor"
 *       "pUsername": "patient"
 *       "date": <Date Object>
 *       "reason": Headache
 *     }
 *
 * @apiSuccess {Boolean} success Indicates result of operation
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 */

router.get('/', function(req, res, next) {


    db
        .get()
        .collection('users')
        .findOne({username:req.query.dUsername})
        .then(function (doctor) {
            console.log(req.query.dUsername);
            if(doctor == null){
                res.json({
                    success: false,
                    doctorUsernameExistsPassed: false,
                    doctorAuthPassed: false,
                    patientUsernameExistsPassed: false,
                    scheduleFreePassed: false
                });
            }

            if(doctor.acctype !=='doctor'){
                res.json({
                    success: false,
                    doctorUsernameExistsPassed: true,
                    doctorAuthPassed: false,
                    patientUsernameExistsPassed: false,
                    scheduleFreePassed: false
                });
            }

            else {
                db
                    .get()
                    .collection('users')
                    .findOne({username:req.query.pUsername})
                    .then(function (patient) {
                        if(patient == null){
                            res.json({
                                success: false,
                                doctorUsernameExistsPassed: true,
                                doctorAuthPassed: true,
                                patientUsernameExistsPassed: false,
                                scheduleFreePassed: false
                            });
                        }

                        else{
                            var requestTime = new Date(req.query.date);
                            var startTimes = doctor.startTime;
                            var endTimes = doctor.endTime;

                            console.log(startTimes.length);

                            var schedulePassed = true;
                            for(var i = 0; i<startTimes.length; i++){
                                var startTime = new Date(startTimes[i]);
                                var endTime = new Date(endTimes[i]);


                                if(requestTime.getTime()>=startTime.getTime() && requestTime.getTime()<=endTime.getTime() && schedulePassed){
                                    schedulePassed = false;
                                    res.json({
                                        success: false,
                                        doctorUsernameExistsPassed: true,
                                        doctorAuthPassed: true,
                                        patientUsernameExistsPassed: true,
                                        scheduleFreePassed: false
                                    });
                                }
                            }

                            if(schedulePassed){
                                var duration = requestTime.getTime() + (20 * 60 * 1000);
                                duration = new Date(duration);

                                db
                                    .get()
                                    .collection('users')
                                    .updateOne({username:doctor.username},
                                        {$push:{
                                                notifications:["Appointment request from " + patient.username + " at "+ requestTime + " with reason "+ req.reason]
                                                ,startTime:[requestTime],endTime:[duration]}})
                                    .then(function () {
                                        res.json({
                                            success:true
                                        });
                                    });

                            }



                        }
                    })
            }
        });









































//
//
//     try
//     {
//         var requestDate = new Date(req.query.date);
//
//         //TODO This for loop can be optimized
//
//         for(var i = 0; i<doctor.schedule.length; i++){
//             var busyDate = doctor.schedule[i];
//
//             if(requestDate.getTime() === busyDate.getTime()){
//                 res.json({
//                     success: false,
//                     message: "ScheduleFilledError"
//                 });
//             }
//
//         }
//
//         var newSchedule = doctor.schedule;
//         newSchedule.insertOne(requestDate);
//
//         //TODO Need to set time period of visit
//
//         collection.updateOne(
//             {"username":req.query.dUsername},
//             {$set:{"schedule" : newSchedule}});
//
//         console.log('schedule added');
//
//         res.json({
//             success: true
//         });
//
//     }catch(e)
//     {
//         print(e);
//     }
//
});




module.exports = router;
