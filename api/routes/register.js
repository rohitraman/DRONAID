var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var db = require('../db');


/**
 * @api {get} localhost:3000/mad/register Create a user
 *
 * @apiDescription Used to create an account on the DRONAID server.
 * The account can be either a patient, doctor or an admin account.
 * Every account must have a unique username.
 * The account should have a password with a length greater than 8 characters
 *
 * @apiError RegisterError There was an error during registration.
 *
 * @apiErrorExample {json} RegisterError
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false
 *       "usernamePassed": true
 *       "passwordPassed": false
 *       "accountTypePassed": true
 *     }
 *

 * @apiExample {curl} Example usage:
 * curl -XGET
 * 'localhost:3000/mad/register?
 * username=bennyhawk&
 * password=password&
 * accounttype=patient'
 *
 * @apiGroup User Operations
 *
 *
 * @apiName Create User
 *
 * @apiParam {String} username Unique username for the account.
 * @apiParam {String} password Password of length greater than 8 characters.
 * @apiParam {String} accounttype Type of account to be created.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "bennyhawk"
 *       "password": "password"
 *       "accounttype": "patient"
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

    //Check cases
    var isUsernamePassed = false;
    var isPasswordPassed = false;
    var isAccountTypePassed = false;

    //Log parameters
    console.log("*************************");
    console.log("Register Endpoint: Params: Username: " + req.query.username);
    console.log("Register Endpoint: Params: Password: " + req.query.password);
    console.log("Register Endpoint: Params: Account Type: " + req.query.accounttype);
    console.log("*************************");



    function finalCheck() {
        console.log("*************************");
        if(isUsernamePassed && isPasswordPassed && isAccountTypePassed){
            console.log("Register Endpoint: finalCheck: Checks: All pass");
            db
                .get()
                .collection('users')
                .insertOne( {
                username: req.query.username,
                password: req.query.password,
                acctype: req.query.accounttype,
                softDelete:false})
                .then(function () {
                    console.log("Register Endpoint: finalCheck: Write to database: Pass");
                    const token = jwt.sign({
                        exp:   Math.floor(new Date().getTime()/1000) + 7*24*60*60,
                        acctype: req.query.accounttype
                    },req.query.username);
                    console.log("Register Endpoint: finalCheck: Token Created: " + token);
                    console.log("*************************");
                    res.json({
                        success: true,
                        token: token
                    })
                },function (reason) {
                    console.log(reason);

                });
        }
        else{
            console.log("Register Endpoint: finalCheck: Checks: Some Fail");
            res.json({
                success: false,
                usernamePassed: isUsernamePassed,
                passwordPassed: isPasswordPassed,
                accountTypePassed: isAccountTypePassed
            })
        }
        console.log("*************************");

    }

    function checkUsername() {
        db
            .get()
            .collection('users')
            .findOne({username:req.query.username})
            .then(function (users) {
                if(users == null){
                    isUsernamePassed = true;
                    console.log("Register Endpoint: checkUsername: isUsernameUnique: Pass");

                }
                else {
                    console.log("Register Endpoint: checkUsername: isUsernameUnique: Fail");
                    console.log("Existing User: ");
                    console.log(users);
                }
                finalCheck();
            },function (reason) {
                console.log(reason)
            })
    }

    function checkPassword() {
        if(req.query.password.length>8){
            console.log("Register Endpoint: checkPassword: isPasswordValid: Pass");
            isPasswordPassed=true;
        }
        else {
            console.log("Register Endpoint: checkPassword: isPasswordValid: Fail");
        }
    }

    function checkAccountType() {
        if(req.query.accounttype === "patient" ||req.query.accounttype === "doctor" ||req.query.accounttype === "admin"){
            console.log("Register Endpoint: checkAccountType: isAccountTypeValid: Pass");
            isAccountTypePassed=true;
        }
        else {
            console.log("Register Endpoint: checkAccountType: isAccountTypeValid: Fail");

        }
    }

    checkPassword();
    checkAccountType();
    checkUsername();


});


module.exports = router;
