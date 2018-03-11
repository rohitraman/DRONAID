var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoSanitize = require('express-mongo-sanitize');

var deleteUser = require('./routes/deleteUser');
var index = require('./routes/index');
var makeAppointment = require('./routes/makeAppointment');
var register = require('./routes/register');
var requestDrone = require('./routes/requestDrone');
var searchDoctor = require('./routes/searchDoctor');
var signIn = require('./routes/signIn');
var updateUser = require('./routes/updateUser');
var sync = require('./routes/sync');



var app = express();
function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}


var db = require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sanitize querys to prevent mongo injection and replace prohibited characters with _
app.use(mongoSanitize({
    replaceWith: '_'
}));

var url = process.env.MONGOLAB_URI;

// Connect to Mongo on start
db.connect(url, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    }
});

/*****************
 *
 * Endpoints that do not require any privileges : Start
 *
 */

//Endpoint to render documentation
app.use('/mad/apidoc', express.static(__dirname + '/docs'));
//Endpoint to check if API is up
app.use('/mad/', index);
app.use('/mad/register', register);
app.use('/mad/signIn', signIn);


/*****************
 *
 * Endpoints that do not require any privileges : End
 *
 */


app.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,req.query.username,function (err,decod) {
            if(err){
                res.render('error', { message: 'Invalid Token' });
            }
            else{
                //If decoded then call next() so that respective route is called.
                if(decod.acctype === 'doctor'|| decod.acctype ==='admin'|| decod.acctype === 'patient') {
                    req.decoded=decod;
                    next();
                } else {

                    console.log(decod);
                    res.render('error', { message: 'Invalid Authentication' });
                }
            }
        })
    }
    else{
        res.render('error', { message: 'No Token' });
    }
});


/*****************
 *
 * Endpoints that require either patient, doctor or admin privileges : Start
 *
 */

app.use('/mad/makeAppointment', makeAppointment);
app.use('/mad/requestDrone', requestDrone);
app.use('/mad/searchDoctor', searchDoctor);
app.use('/mad/updateUser', updateUser);
app.use('/mad/deleteUser', deleteUser);
app.use('/mad/sync', sync);


/*****************
 *
 * Endpoints that require either patient, doctor or admin privileges : End
 *
 */



app.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,req.query.username,function (err,decod) {
            if(err){
                res.render('error', { message: 'Invalid Token' });
            }
            else{
                //If decoded then call next() so that respective route is called.
                if(decod.acctype === 'doctor'|| decod.acctype ==='admin') {
                    req.decoded=decod;
                    next();
                } else {

                    console.log(decod);
                    res.render('error', { message: 'Invalid Authentication' });
                }
            }
        })
    }
    else{
	        res.render('error', { message: 'No Token' });
    }
});


/*****************
 *
 * Endpoints that require either doctor or admin privileges : Start
 *
 */



/*****************
 *
 * Endpoints that require either doctor or admin privileges : End
 *
 */




app.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        jwt.verify(token,req.query.username,function (err,decod) {
            if(err){
                res.render('error', { message: 'Invalid Token' });
            }
            else{
                //If decoded then call next() so that respective route is called.
                if(decod.acctype === 'admin') {
                    req.decoded=decod;
                    next();
                } else {
                    res.render('error', { message: 'Invalid Authentication' });

                }
            }
        })
    }
    else{
        res.render('error', { message: 'No Token' });
    }
});

/*****************
 *
 * Endpoints that require admin privileges : Start
 *
 */



/*****************
 *
 * Endpoints that require admin privileges : End
 *
 */



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(3000);
module.exports = app;
