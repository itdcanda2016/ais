'use strict';
// Used to encrypt user password before adding it to db.
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    profile_image_url: DataTypes.STRING,
    entered_date: DataTypes.DATE,
    course_type: DataTypes.INTEGER,
    admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        user.password = bcrypt.hashSync(user.password);
      },
      beforeUpdate: function(user, options) {
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
      },
      toStringEnterdDate: function() {
        var entered_date = new Date(this.entered_date);
        var year = entered_date.getFullYear(),
            month = entered_date.getMonth() + 1,
            day = entered_date.getDate();
        return year + '-' + '0'.concat(month).slice(-2) + '-' + day;
      }
    },
    getterMethods: {
      username: function() { return this.email },
      fullName: function() { return this.first_name + ' ' + this.last_name }
    },
    setterMethods: {
      username: function(username) {
        this.setDataValue('email', username);
      }
    }
  });
  return User;
};
