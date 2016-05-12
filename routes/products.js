var express = require('express');
var router = express.Router();
var models = require('../models');

// Get products
router.get('/products', function(req, res, next) {

});

// Get product
router.get('/products/:product_id', function(req, res) {

});

// Create product
router.post('/products', function(req, res) {

});

// Update product
router.put('/products/:product_id', function(req, res) {

});

// Delete product
router.delete('/products/:product_id', function(req, res) {

});

module.exports = router;
