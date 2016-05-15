var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// main routes
var routes = require('./routes/index');
var comments = require('./routes/comments');
var courses = require('./routes/courses');
var lectures = require('./routes/lectures');
var products = require('./routes/products');
var users = require('./routes/users');

// admin routes
// var admin = require('./routes/admin');
var adminComments = require('./routes/admin/comments');
var adminCourses = require('./routes/admin/courses');
var adminLectures = require('./routes/admin/lectures');
var adminProducts = require('./routes/admin/products');
var adminUsers = require('./routes/admin/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// main routes
app.use('/', routes);
app.use('/comments', comments);
app.use('/courses', courses);
app.use('/lectures', lectures);
app.use('/products', products);
app.use('/users', users);

// admin routes
//app.use('/admin', admin);
app.use('/admin/comments', adminComments);
app.use('/admin/courses', adminCourses);
app.use('/admin/lectures', adminLectures);
app.use('/admin/products', adminProducts);
app.use('/admin/users', adminUsers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
