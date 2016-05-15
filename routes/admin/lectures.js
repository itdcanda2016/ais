var express = require('express');
var router = express.Router();
var models = require('../../models');

// Get lectures
router.get('/', function(req, res, next) {
  models.Lecture.findAll({
    where: {}
  })
  .then(function(lectures) {
    res.status(200)
       .render('admin/lectures/index', { lectures: lectures });
  });
});

// New comment
router.get('/new', function(req, res) {
  res.render('admin/lectures/new');
});

// Get lecture
router.get('/:lecture_id', function(req, res) {
  var id = req.params.lecture_id;

  models.Lecture.findById(id)
    .then(function(lecture) {
      res.status(200).json(lecture);
    });
});

// Edit lecture
router.get('/:lecture_id/edit', function(req, res) {
  var id = req.params.lecture_id;

  models.Lecture.findById(id)
    .then(function(lecture) {
      res.status(200)
         .render('admin/lectures/edit', { lecture: lecture });
    });
});

// Create lecture
router.post('/', function(req, res) {
  var params = {
    name: req.body.name,
    started_date: req.body.started_date,
    ended_date: req.body.ended_date,
    teacher_name: req.body.teacher_name,
    description: req.body.description,
    course_id: req.body.course_id,
  };

  models.Lecture
    .create(params)
    .then(function() {
      res.status(200).redirect('/admin/lectures');
    });
});

// Update lecture
router.put('/:lecture_id', function(req, res) {
  var id = req.params.lecture_id;
  var params = {
    name: req.body.name,
    started_date: req.body.started_date,
    ended_date: req.body.ended_date,
    teacher_name: req.body.teacher_name,
    description: req.body.description,
    course_id: req.body.course_id,
  };

  models.Lecture.findById(id)
    .then(function(lecture) {
      lecture.update(params)
        .then(function() {
          res.status(200).redirect('/admin/lectures');
        });
    });
});

// Delete lecture
router.delete('/:lecture_id', function(req, res) {
  var id = req.params.lecture_id;

  models.Lecture.destroy({
    where: {
      id: id
    }
  })
  .then(function() {
    res.status(200).redirect('/admin/lectures');
  });
});

module.exports = router;
