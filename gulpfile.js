var gulp = require('gulp');

gulp.task('createDatabase', function() {
  var Sequelize = require('sequelize');
  var pg = require('pg');
  var env = process.env.NODE_ENV || 'development';

  var dbName = "ais_database_" + env;
  var username = "postgres";
  var password = "postgres";
  var host = "localhost";

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
