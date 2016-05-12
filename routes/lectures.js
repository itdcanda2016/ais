var express = require('express');
var router = express.Router();
var models = require('../models');

// Get lectures
router.get('/lectures', function(req, res, next) {

});

// Get lecture
router.get('/lectures/:lecture_id', function(req, res) {

});

// Create lecture
router.post('/lectures', function(req, res) {

});

// Update lecture
router.put('/lectures/:lecture', function(req, res) {

});

// Delete lecture
router.delete('/lectures/:lecture', function(req, res) {

});

module.exports = router;
