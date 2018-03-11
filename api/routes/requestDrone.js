var express = require('express');
var router = express.Router();
var db = require('../db');
var geolib = require('geolib');

/**
 * @api {get} localhost:3000/requestDrone Request a drone
 *
 * @apiDescription Request for a drone to be sent to a location
 *
 * @apiError DistanceError The location is farther than the drone's capacity
 *
 * @apiErrorExample {json} DistanceError
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false
 *       "message": "DistanceError"
 *     }
 *
 * @apiExample {curl} Example usage:
 * curl -XGET
 * 'localhost:3000/requestDrone?
 * username=bennyhawk
 * password=password
 * lat=<Number Object>
 * long=<Number Object>'
 *
 * @apiGroup Request Drone
 *
 * @apiName RequestDrone
 *
 * @apiParam {String} username Mandatory username needed
 * @apiParam {String} password Mandatory password needed
 * @apiParam {Number} lat Mandatory latitude of position
 * @apiParam {Number} long Mandatory longitude of position
 *
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "bennyhawk"
 *       "password": "password"
 *       "lat": <Number Object>
 *       "long": <Number Object>
 *     }
 *
 * @apiSuccess {Boolean} success Indicates result of operation
 * @apiSuccess {Number} distance Gives distance of the drone station in meters
 * @apiSuccess {Number} station Gives the id of the closest drone station
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *       "distance" : 26
 *     }
 *
 */



router.get('/', function(req, res) {

    var spots = [
        {latitude: 52.516272, longitude: 13.377722},
        {latitude: 51.515, longitude: 7.453619},
        {latitude: 51.503333, longitude: -0.119722},
        {latitude: 55.751667, longitude: 37.617778},
        {latitude: 48.8583, longitude: 2.2945},
        {latitude: 59.3275, longitude: 18.0675},
        {latitude: 59.916911, longitude: 10.727567}
    ];

    var position = {latitude: req.query.lat, longitude: req.query.long};

    var closest = geolib.findNearest(position,spots);

    db
        .get()
        .collection('users')
        .findOne({username:req.query.username})
        .then(function (user) {
            if(user.password === req.query.password){

                //TODO Add logic for distance estimation

                res.json({
                    success: true,
                    distance: closest.distance,
                    station: closest.key
                });

            }
        });







});

module.exports = router;
