var gulp = require('gulp');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/config/config.json')[env];

gulp.task('createDatabase', function() {
  var Sequelize = require('sequelize');
  var pg = require('pg');
  var env = process.env.NODE_ENV || 'development';

  var dbName = config.database;
  var username = config.username;
  var password = config.password;
  var host = config.host;

  var conStringPri = 'postgres://' + username + ':' + password + '@' + host + '/postgres';
  var conStringPost = 'postgres://' + username + ':' + password + '@' + host + '/' + dbName;

  // connect to postgres db
  pg.connect(conStringPri, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    // create the db and ignore any errord, for example if it already exists.
    client.query('CREATE DATABASE ' + dbName, function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result);
    });
  });
});
