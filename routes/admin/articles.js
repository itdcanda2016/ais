var express = require('express');
var router = express.Router();
var models = require('../../models');

// Get all articles
router.get('/', function(req, res) {
  models.Article.findAll({
    where: {}
  })
  .then(function(articles) {
    res.status(200)
       .render('admin/articles/index', { articles: articles });
  });
});

// New article
router.get('/new', function(req, res) {
  res.render('admin/articles/new');
});

// Get article
router.get('/:article_id', function(req, res) {
  var id = req.params.article_id;

  models.Article.findById(id)
    .then(function(article) {
      res.status(200).json(article);
    });
});

// Edit article
router.get('/:article_id/edit', function(req, res) {
  var id = req.params.article_id;

  models.Article.findById(id)
    .then(function(article) {
      res.status(200)
         .render('admin/articles/edit', { article: article });
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

  models.Article
    .create(params)
    .then(function(article) {
      return res.status(200).redirect('/admin/articles');
    })
    .catch(function(err) {
      return res.render('admin/articles/new', { title: 'Crete', errorMessage: err.message });
    });
});

// Update article
router.post('/:article_id', function(req, res) {
  var id = req.params.article_id;
  var params = {
    user_id: req.body.user_id,
    article_type_id: req.body.article_type_id,
    title: req.body.title,
    content: req.body.content,
  };

  models.Article.findById(id)
    .then(function(article) {
      article.update(params)
        .then(function() {
          return res.status(200).redirect('/admin/articles');
        })
        .catch(function(err) {
          return res.render('/', { title: 'Update', errorMessage: err.message });
        });
    });
});


// Delete article
router.delete('/:article_id', function(req, res) {
  var id = req.params.article_id;
console.log("hoghgoe" + id);
  models.Article.destroy({
    where: { id: id }
  })
  .then(function() {
    res.status(200).redirect('/admin/articles');
  });
});

module.exports = router;
