var express = require('express');
var router = express.Router();
var models = require('../models');

// Get all courses
router.get('/', function(req, res) {
  models.Course.findAll({
    where: {}
  })
  .then(function(courses) {
    res.status(200).json(courses);
  });
});

// Get course
router.get('/:course_id', function(req, res) {
  var id = req.params.courses_id;

  models.Course.findById(id)
    .then(function(course) {
      res.status(200).json(course);
    });
});

// Create course
router.post('/', function(req, res) {
  var params = {
    name: req.body.name,
    length: req.body.length,
    started_date: req.body.started_date,
    ended_date: req.body.ended_date,
  };

  models.Course
    .create(params)
    .then(function(course) {
      res.status(200).json(course);
    });
});

// Update course
router.put('/:course_id', function(req, res) {
  var id = req.params.course_id;
  var params = {
    name: req.body.name,
    length: req.body.length,
    started_date: req.body.started_date,
    ended_date: req.body.ended_date,
  };

  models.Course.findById(id)
    .then(function(course) {
      course.update(params)
        .then(function(c) {
          res.status(200).json(c);
        });
    });
});

// Delete course
router.delete('/:course_id', function(req, res) {
  var id = req.params.course_id;

  models.Course.destroy({
    where: {
      id: id
    }
  })
  .then(function() {
    res.status(200).end();
  });
});

module.exports = router;
