var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    flash = require('connect-flash'),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    LocalStrategy = require('passport-local').Strategy;

// main routes
var routes = require('./routes/index'),
    comments = require('./routes/comments'),
    courses = require('./routes/courses'),
    lectures = require('./routes/lectures'),
    products = require('./routes/products'),
    users = require('./routes/users');

// admin routes
// var admin = require('./routes/admin');
var adminComments = require('./routes/admin/comments'),
    adminCourses = require('./routes/admin/courses'),
    adminLectures = require('./routes/admin/lectures'),
    adminProducts = require('./routes/admin/products'),
    adminUsers = require('./routes/admin/users');

var app = express();

require('./passport.js')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// https://github.com/expressjs/session
// https://github.com/mjhea0/passport-local-express4/blob/master/app.js#L28
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'i love makina'
}))

// for error message
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// confirm login authenticated
app.all('/*hoge*', function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
});

// confirm admin role
app.all('/admin/*', function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  if (!req.user.isAdmin()) {
    return res.redirect('/');
  }
  next();
});

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
