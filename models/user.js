'use strict';
// Used to encrypt user password before adding it to db.
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_image_url: DataTypes.STRING,
    entered_date: DataTypes.DATE,
    course_type: DataTypes.INTEGER,
    admin: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.password = bcrypt.hashSync(user.password);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      },
      isAdmin: function() {
        return this.admin;
      }
    },
    getterMethods: {
      username: function() { return this.email }
    },
    setterMethods: {
      username: function(username) {
        this.setDataValue('email', username);
      }
    }
  });
  return User;
};
