var express = require('express');
var router = express.Router();
var models = require('../../models');

// Get all comments
router.get('/', function(req, res) {
  models.Comment.findAll({
    where: {}
  })
  .then(function(comments) {
    res.status(200)
       .render('admin/comments/index', { comments: comments });
  });
});

// New comment
router.get('/new', function(req, res) {
  res.render('admin/comments/new');
});

// Get comment
router.get('/:comment_id', function(req, res) {
  var id = req.params.comment_id;

  models.Comment.findById(id)
    .then(function(comment) {
      res.status(200).json(comment);
    });
});

// Edit comment
router.get('/:comment_id/edit', function(req, res) {
  var id = req.params.comment_id;

  models.Comment.findById(id)
    .then(function(comment) {
      res.status(200)
         .render('admin/comments/edit', { comment: comment });
    });
});

// Create comment
router.post('/', function(req, res) {
  var params = {
    user_id: req.body.user_id,
    course_id: req.body.course_id,
    class_id: req.body.class_id,
    content: req.body.content,
    related_comment_id: req.body.related_comment_id,
  };

  models.Comment
    .create(params)
    .then(function() {
      res.status(200).redirect('/admin/comments');
    });
});

// Update comment
router.post('/:comment_id', function(req, res) {
  var id = req.params.comment_id;
  var params = {
    user_id: req.body.user_id,
    course_id: req.body.course_id,
    class_id: req.body.class_id,
    content: req.body.content,
    related_comment_id: req.body.related_comment_id,
  };

  models.Comment.findById(id)
    .then(function(comment) {
      comment.update(params)
        .then(function() {
          res.status(200).redirect('/admin/comments');
        });
    });
});

// Delete
router.delete('/:comment_id', function(req, res) {
  var id = req.params.comment_id;

  models.Comment.destroy({
    where: {
      id: id
    }
  })
  .then(function() {
    res.status(200).redirect('/admin/comments');
  });
});

module.exports = router;
