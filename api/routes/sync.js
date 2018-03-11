var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var db = require('../db');

/**
 * @api {get} localhost:3000/mad/sync Sync user details
 *
 * @apiDescription Used to sync user details from the server
 *
 * @apiError SyncError There was an error during sync.
 *
 * @apiErrorExample {json} SyncError
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false
 *       "usernameExistsPassed": true
 *     }
 *
 * @apiExample {curl} Example usage:
 * curl -XGET
 * -H 'Authorization: <JWT token here>'
 * 'localhost:3000/sync?
 * username=bennyhawk'
 *
 *
 * @apiGroup User Operations
 *
 * @apiName Sync
 *
 * @apiParam {String} username username of the user wanting to sign in
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "bennyhawk"
 *     }
 *
 * @apiSuccess {Boolean} success Indicates result of operation
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *       "username" : <String>
 *       "password" : <String>
 *       "accounttype" <String>
 *     }
 *
 */


router.get('/', function(req, res) {

    var queryCounter = 0;

    var queryParams = req.query;

    console.log("*************************");
    console.log("Sync Endpoint");
    console.log("   Params:");

    for (var key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
            queryCounter++;
            if(queryCounter>2){

            }else{
                console.log("       -> "+key+ ": " + queryParams[key]);
            }
        }
    }

    console.log("");



    db
        .get()
        .collection('users')
        .findOne({username:req.query.username,softDelete:false}) //TODO Check if account is soft deleted
        .then(function(users){


            if(users == null){
                console.log("Sync Endpoint: doesUsernameExist: Fail");
                console.log("*************************");

                res.json({
                    success: false,
                    usernameExistsPassed: false,
                });
            }
            else {
                console.log("Sync Endpoint: doesUsernameExist: Pass");
                console.log(users.password);



                    console.log("*************************");


                    res.json({
                        success: true,
                        username: users.username,
                        password: users.password,
                        accounttype: users.acctype
                    });
                }




        });




});

module.exports = router;
