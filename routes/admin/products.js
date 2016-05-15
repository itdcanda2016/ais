var express = require('express');
var router = express.Router();
var models = require('../../models');

// Get products
router.get('/', function(req, res, next) {
  models.Product.findAll({
    where: {}
  })
  .then(function(products) {
    res.status(200)
       .render('admin/products/index', { products: products });
  });
});

// New comment
router.get('/new', function(req, res) {
  res.render('admin/products/new');
});

// Get product
router.get('/:product_id', function(req, res) {
  var id = req.params.product_id;

  models.Product.findById(id)
    .then(function(product) {
      res.status(200).json(product);
    });
});

// Edit product
router.get('/:product_id/edit', function(req, res) {
  var id = req.params.product_id;

  models.Comment.findById(id)
    .then(function(product) {
      res.status(200)
         .render('admin/products/edit', { product: product });
    });
});

// Create product
router.post('/', function(req, res) {
  var params = {
    name: req.body.name,
    related_url: req.body.related_url,
    image_url: req.body.image_url,
    course_id: req.body.course_id,
  };

  models.Product
    .create(params)
    .then(function() {
      res.status(200).redirect('/admin/products');
    });
});

// Update product
router.put('/:product_id', function(req, res) {
  var id = req.params.product_id;
  var params = {
    name: req.body.name,
    related_url: req.body.related_url,
    image_url: req.body.image_url,
    course_id: req.body.course_id,
  };

  models.Product.findById(id)
    .then(function(product) {
      product.update(params)
        .then(function() {
          res.status(200).redirect('/admin/products');
        });
    });
});

// Delete product
router.delete('/:product_id', function(req, res) {
  var id = req.params.product_id;

  models.Product.destroy({
    where: {
      id: id
    }
  })
  .then(function() {
    res.status(200).redirect('/admin/products');
  });
});

module.exports = router;
