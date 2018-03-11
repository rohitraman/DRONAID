var express = require('express');
var router = express.Router();
var db = require('../db');

/**
 * @api {get} localhost:3000/updateUser Update a user
 *
 * @apiDescription Used to update user details from the database
 *
 * @apiError UpdateUserError There was an error during updating the user.
 *
 * @apiErrorExample {json} DeleteUserError
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false
 *       "usernameExistsPassed": true
 *       "credentialsPassed": false
 *       "updateSuccessful": false
 *     }
 *
 * @apiExample {curl} Example usage:
 * curl -XGET
 * -H 'Authorization: <JWT token here>'
 * 'localhost:3000/updateUser?
 * username=bennyhawk
 * password=password
 * newusername=bennyhawk123
 * newpassword=password123
 * newage=20'
 *
 *
 * @apiGroup User Operations
 *
 * @apiHeader {String} Authorization Will contain JWT Token given to the user.
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "<JWT Token here>"
 *     }
 *
 * @apiName Update User
 *
 * @apiParam {String} username Mandatory username needed
 * @apiParam {String} password Mandatory password needed
 * @apiParam {String} [newusername] Optional new username if update needed
 * @apiParam {String} [newpassword] Optional new password if update needed
 * @apiParam {Number} [newage] Optional new age if update needed
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "bennyhawk"
 *       "password": "password"
 *       "newusername": "bennyhawk123"
 *       "newpassword": "password123"
 *       "newage": "20"
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


    console.log("*************************");
    db
        .get()
        .collection('users')
        .findOne({username:req.query.username,softDelete:false})
        .then(function (users) {
            if(users == null){
                console.log("UpdateUser Endpoint: doesUsernameExist: Fail");
                console.log("UpdateUser Endpoint: isCredentialsCorrect: Fail");
                console.log("*************************");

                res.json({
                    success: false,
                    usernameExistsPassed: false,
                    credentialsPassed: false,
                    updateSuccessful: false
                });
            }
            else {
                console.log("UpdateUser Endpoint: doesUsernameExist: Pass");
                if (users.password === req.query.password) {
                    console.log("UpdateUser Endpoint: isCredentialsCorrect: Pass");

                    var username = users.username;
                    var password = users.password;
                    var age = users.age;

                    if(req.query.newusername != null){username = req.query.newusername;}
                    if(req.query.newpassword != null){password = req.query.newpassword;}
                    if(req.query.newage != null){age = req.query.newage;}


                    db
                        .get()
                        .collection('users')
                        .updateOne({"username":req.query.username,"softDelete":false},
                            {$set:{"username" : username, "password" : password,"age" : age}})
                        .then(function () {
                            console.log("*************************");
                            res.json({
                                success: true
                            });

                        },function (reason) {
                            console.log("Error in updating");
                            console.log(reason);
                            console.log("*************************");
                            res.json({
                                success: false,
                                usernameExistsPassed: true,
                                credentialsPassed: true,
                                updateSuccessful: false
                            });
                        })





                }
                else{
                    console.log("UpdateUser Endpoint: isCredentialsCorrect: Fail");
                    console.log("*************************");

                    res.json({
                        success: false,
                        usernameExistsPassed: true,
                        credentialsPassed: false,
                        updateSuccessful: false
                    });
                }
            }
        });






});

module.exports = router;

