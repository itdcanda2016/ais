var LocalStrategy = require('passport-local').Strategy,
    models = require('./models');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    models.User.findById(id)
    .then(function(user) {
      done(null, user);
    });
  });

  // login function
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(email, password, done) {
      models.User.findOne({where: { email: email }})
        .then(function(user) {
          if (!user) {
            return done(null, false);
          }
          if (!user.validPassword(password)) {
            return done(null, false);
          }
          return done(null, user);
        });
    }
  ));
}
