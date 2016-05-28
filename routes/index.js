var express = require('express');
var router = express.Router();
var passport = require('passport');
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { messages: req.flash('info') });
});

// Login page
router.get('/login', function(req, res) {
  res.render('login.ejs');
});

// Login
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
                        successRedirect: '/',
                        failureRedirect: '/login'
  }, function(err, user, info) {
    if (err) {
      return res.render('login', { title: 'Login', errorMessage: err.message });
    }
    if (!user) {
      return res.render('login', { title: 'Login' });
    }

    return req.logIn(user, function(err) {
      if (err) {
        return res.render('login', { title: 'Login', errorMessage: err.message });
      } else {
        return res.redirect('/');
      }
    });
  })(req, res, next);
});

// Admin top
router.get('/admin', function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  res.render('admin/index');
});

module.exports = router;
