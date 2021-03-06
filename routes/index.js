var express = require('express');
var router = express.Router();

/* Initialize the routers here */
/******************************/

var users = require('./users');
var schedule = require('./schedule');
var categories = require('./categories');

/* define routes for each router */
/******************************/
router.use('/users', users);
router.use('/schedule', schedule);
router.use('/categories', categories);

module.exports = router;
