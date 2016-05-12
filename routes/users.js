var express = require('express');
var router = express.Router();
var models = require('../models');

// Get users
router.get('/', function(req, res, next) {
  models.User.findAll({
    where: {}
  })
  .then(function(users) {
    res.status(200).json(users);
  });
});

// Get user
router.get('/:user_id', function(req, res) {
  var id = req.params.user_id;

  models.User.findById(id)
    .then(function(user) {
      res.status(200).json(user);
    });
});

// Create user
router.post('/', function(req, res) {
  var params = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    profile_image_url: req.body.profile_image_url,
    entered_date: req.body.entered_date,
    course_type: req.body.course_type,
  };

  models.User
    .create(params)
    .then(function(user) {
      res.status(200).json(user);
    });
});

// Update user
router.put('/:user_id', function(req, res) {
  var id = req.params.user_id;
  var params = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    profile_image_url: req.body.profile_image_url,
    entered_date: req.body.entered_date,
    course_type: req.body.course_type,
  };

  models.User.findById(id)
    .then(function(user) {
      user.update(params)
        .then(function(u) {
          res.status(200).json(u);
        });
    });
});

// Delete user
router.delete('/:user_id', function(req, res) {
  var id = req.params.user_id;

  models.User.destroy({
    where: {
      id: id
    }
  })
  .then(function() {
    res.status(200).end();
  });
});

module.exports = router;
