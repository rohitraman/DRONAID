var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var db = require('../db');

/**
 * @api {get} localhost:3000/mad/signin Sign in
 *
 * @apiDescription Used to sign in a user to the server
 *
 * @apiError SignInError There was an error during sign in.
 *
 * @apiErrorExample {json} SignInError
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false
 *       "usernameExistsPassed": true
 *       "credentialsPassed": false
 *     }
 *
 * @apiExample {curl} Example usage:
 * curl -XGET
 * 'localhost:3000/mad/signin?
 * username=bennyhawk
 * password=password123'
 *
 * @apiGroup User Operations
 *
 * @apiName Sign In
 *
 * @apiParam {String} username username of the user wanting to sign in
 * @apiParam {String} password password corresponding to the username
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "bennyhawk"
 *       "password": "password"
 *     }
 *
 * @apiSuccess {Boolean} success Indicates result of operation
 * @apiSuccess {String} token Gives access token to be placed in the Authorization header for further requests
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *       "token" : <JWT Token>
 *     }
 *
 */


router.get('/', function(req, res) {

    var queryCounter = 0;

    var queryParams = req.query;

    console.log("*************************");
    console.log("SignIn Endpoint");
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
                console.log("SignIn Endpoint: doesUsernameExist: Fail");
                console.log("SignIn Endpoint: isCredentialsCorrect: Fail");
                console.log("*************************");

                res.json({
                    success: false,
                    usernameExistsPassed: false,
                    credentialsPassed: false
                });
            }
            else {
                console.log("SignIn Endpoint: doesUsernameExist: Pass");
                console.log(users.password);
                if (users.password === req.query.password) {
                    console.log("SignIn Endpoint: isCredentialsCorrect: Pass");

                    const token = jwt.sign({
                        acctype: users.acctype,
                        //auth:  req.query.acctype
                        //agent: req.headers['user-agent'],
                        exp:   Math.floor(new Date().getTime()/1000) + 7*24*60*60
                    }, users.username);
                    console.log("*************************");


                    res.json({
                        success: true,
                        token: token
                    });
                }
                else{
                    console.log("SignIn Endpoint: isCredentialsCorrect: Fail");
                    console.log("*************************");

                    res.json({
                        success: false,
                        usernameExistsPassed: true,
                        credentialsPassed: false
                    });
                }
            }



    });




});

module.exports = router;
