'use strict';

var express = require('express');
var router = express.Router();

// Routes for the home page -- begin
/*router.get('/', function(req, res) {
  res.render('index', { title: 'Ideation Portal' });
});

router.post('/', function(req, res) {
  res.render('index', { title: 'Ideation Portal' });
});*/
// routes for the home page -- end

/*router.get('/todo', function(req, res) {
  res.render('todo', { title: 'Ideation Portal - ToDo List' });
});

router.get('/campaign', function(req, res) {
  res.render('campaign', { title: 'Ideation Portal - Campaigns' });
});

router.get('/idea', function(req, res) {
  res.render('idea', { title: 'Ideation Portal - Ideas' });
});

router.get('/user', function(req, res) {
  res.render('user', { title: 'Ideation Portal - User Management' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Ideation Portal - Security' });
});*/

router.get('/admin', function(req, res) {
  res.render('admin', { title: 'Administration Module - Main Page' });
});

router.get('/cvm', function(req, res) {
  res.render('cvm', { title: 'Customer Visit Portal - Main Page' });
});


router.get('/dashboard', function(req, res) {
  res.render('dashboard', { title: 'Ideation Portal - Dashboard' });
});

/*router.get('/register', function(req, res) {
  res.render('register', { title: 'Ideation Portal - Register' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Ideation Portal - Login' });
});*/

module.exports = router;
