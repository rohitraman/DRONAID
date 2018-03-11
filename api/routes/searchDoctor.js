var express = require('express');
var router = express.Router();
var db = require('../db');

/**
 * @api {get} localhost:3000/searchDoctor Search a doctor
 *
 * @apiDescription Search a doctor by username
 *
 * @apiError SearchDoctorError The requested doctor's username is not found
 *
 * @apiErrorExample {json} SearchDoctorError
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false
 *       "doctorUsernameExistsPassed": false
 *     }
 *
 * @apiExample {curl} Example usage:
 * curl -XGET
 * 'localhost:3000/searchDoctor?
 * dUsername=doctor'
 *
 * @apiGroup Search Operations
 *
 * @apiName Search Doctor
 *
 * @apiParam {String} dUsername Mandatory doctor username needed
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "dUsername": "doctor"
 *     }
 *
 * @apiSuccess {Boolean} success Indicates result of operation *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *       "username": <Username of doctor>
 *       "age": <Age of doctor>
 *     }
 *
 */



router.get('/', function(req, res) {
    console.log("*************************");



    var test = new RegExp(req.query.dUsername,'i');
    console.log(test);

    db
        .get()
        .collection('users')
        .find()
        .filter({username:{ $regex: test},acctype:"doctor"})
        .toArray()
        .then(function (users) {
            if(users !== null){
                console.log("SearchDoctor Endpoint: doesUsernameExist: Pass");
                console.log("*************************");


                res.json({
                    success: true,
                    username: users
                });

            }

            else{
                console.log("SearchDoctor Endpoint: doesUsernameExist: Fail");

                console.log("*************************");

                res.json({
                    success: false,
                    doctorUsernameExistsPassed: false
                });
            }
        });





});

module.exports = router;
