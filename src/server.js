'use strict';

require('rootpath')();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('./config.json');


var routes = require('./server/index/indexRouter');
/*var todos = require('./server/todo/todoRouter');
var campaignApi = require('./server/campaign/campaignRouter');
var ideaApi = require('./server/idea/ideaRouter');
var userApi = require('./server/user/userRouter');
var loginApi = require('./server/user/loginRouter');*/

global.config = require('konfig')()


var git = require('git-rev');
git.log(function (array) {
  console.log('log', array)
});

git.short(function (str) {
  console.log('short', str)
});

require('./scripts/database.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/shared'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret })
  .unless({ 
    path: [
      '/api/users/authenticate'
      , '/api/users/register'
      , '/api/users/'
      , '/api/users/current'
    ] 
  }));


app.use('/', routes);
/*app.use('/todos', todos);
app.use('/campaignApi', campaignApi);
app.use('/ideaApi', ideaApi);
app.use('/userApi', userApi);
app.use('/loginApi', loginApi);*/

// routes
app.use('/login', require('./server/controllers/login.controller'));
app.use('/register', require('./server/controllers/register.controller'));
app.use('/app', require('./server/controllers/app.controller'));
//app.use('/api/users', require('./user/userRouter'));
app.use('/api/users', require('./server/api/user.controller'));
//app.use('/dashboard', express.static('public/app/dashboard'));

var path = require("path"); 

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
