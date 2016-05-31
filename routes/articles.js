var express = require('express');
var router = express.Router();
var models = require('../models');

// Get all articles
router.get('/', function(req, res) {
  models.article.findAll({
    where: {}
  })
  .then(function(articles) {
    res.status(200).json(articles);
  });
});

// Get article
router.get('/:article_id', function(req, res) {
  var id = req.params.article_id;

  models.article.findById(id)
    .then(function(article) {
      res.status(200).json(article);
    });
});

// Create article
router.post('/', function(req, res) {
  var params = {
    user_id: req.body.user_id,
    article_type_id: req.body.article_type_id,
    title: req.body.title,
    content: req.body.content,
  };

  models.article
    .create(params)
    .then(function(article) {
      res.status(200).json(article);
    });
});

// Update article
router.put('/:article_id', function(req, res) {
  var id = req.params.article_id;
  var params = {
    user_id: req.body.user_id,
    article_type_id: req.body.article_type_id,
    title: req.body.title,
    content: req.body.content,
  };

  models.article.findById(id)
    .then(function(article) {
      article.update(params)
        .then(function(c) {
          res.status(200).json(c);
        });
    });
});

// Delete
router.delete('/:article_id', function(req, res) {
  var id = req.params.article_id;

  models.article.destroy({
    where: {
      id: id
    }
  })
  .then(function() {
    res.status(200).end();
  });
});

module.exports = router;
