'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./server/index/indexRouter');
var todos = require('./server/todo/todoRouter');
var campaignApi = require('./server/campaign/campaignRouter');
var ideaApi = require('./server/idea/ideaRouter');
var userApi = require('./server/user/userRouter');

global.config = require('konfig')()
var mongoose = require('mongoose');

//var databaseURI = 'mongodb://localhost/ideation_' + [process.env.NODE_ENV || "dev"];
var databaseURI = global.config.app.db_uri;

mongoose.connect(databaseURI, function(err) {
  if (err) {
    console.log("Cannot connect to database");
    console.error(databaseURI + ' connection error. ', err);
    console.error("Server could not start properly");
    //throw(err);

  } else /*if(process.env.NODE_ENV === 'development')*/{
    console.log(databaseURI + ' connected.');
  }
});

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

app.use('/', routes);
app.use('/todos', todos);
app.use('/campaignApi', campaignApi);
app.use('/ideaApi', ideaApi);
app.use('/userApi', userApi);

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
