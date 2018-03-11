var express = require('express');
var router = express.Router();

var db = require('../db');

/**
 * @api {get} localhost:3000/mad/deleteUser Delete a user
 *
 * @apiDescription Used to soft delete a user from the database. This endpoint only soft deletes the account. Hard delete will require backend intervention.
 *
 * @apiError DeleteUserError There was an error during deleting the user.
 *
 * @apiErrorExample {json} DeleteUserError
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false
 *       "usernameExistsPassed": true
 *       "credentialsPassed": false
 *       "deleteSuccessful": false
 *     }
 *
 * @apiExample {curl} Example usage:
 * curl -XGET
 * -H 'Authorization: <JWT token here>'
 * 'localhost:3000/mad/deleteUser?
 * username=bennyhawk
 * password=password'
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
 * @apiName Delete User
 *
 * @apiParam {String} username The username to be deleted.
 * @apiParam {String} password Password for the corressponding username.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "bennyhawk"
 *       "password": "password"
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

router.get('/', function(req, res) {
    console.log("*************************");
    db
        .get()
        .collection('users')
        .findOne({username:req.query.username,softDelete:false})
        .then(function (users) {
            if(users == null){
                console.log("DeleteUser Endpoint: doesUsernameExist: Fail");
                console.log("DeleteUser Endpoint: isCredentialsCorrect: Fail");
                console.log("*************************");

                res.json({
                    success: false,
                    usernameExistsPassed: false,
                    credentialsPassed: false,
                    deleteSuccessful: false
                });
            }
            else {
                console.log("DeleteUser Endpoint: doesUsernameExist: Pass");
                if (users.password === req.query.password) {
                    console.log("DeleteUser Endpoint: isCredentialsCorrect: Pass");
                    db
                        .get()
                        .collection('users')
                        .updateOne({"username":req.query.username,"softDelete":false},
                            {$set:{"softDelete" : true}})
                        .then(function () {
                            console.log("*************************");
                            res.json({
                                success: true
                            });

                        },function (reason) {
                            console.log("Error in deleting");
                            console.log(reason);
                            console.log("*************************");
                            res.json({
                                success: false,
                                usernameExistsPassed: true,
                                credentialsPassed: true,
                                deleteSuccessful: false
                            });
                        })





                }
                else{
                    console.log("DeleteUser Endpoint: isCredentialsCorrect: Fail");
                    console.log("*************************");

                    res.json({
                        success: false,
                        usernameExistsPassed: true,
                        credentialsPassed: false,
                        deleteSuccessful: false
                    });
                }
            }
        });







});

module.exports = router;
