var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Admin top
router.get('/admin', function(req, res, next) {
  res.status(200).render('admin/index');
});

module.exports = router;
