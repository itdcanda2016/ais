var express = require('express');
var router = express.Router();
var models = require('../models');

// Get comments
router.get('/comments', function(req, res, next) {

});

// Get comment
router.get('/comments/:comment_id', function(req, res) {

});

// Create comment
router.post('/comments', function(req, res) {

});

// Update comment
router.put('/comments/:comment_id', function(req, res) {

});

// Delete
router.delete('/comments/:comment_id', function(req, res) {

});

module.exports = router;
