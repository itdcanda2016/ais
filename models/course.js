'use strict';
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define('Course', {
    name: DataTypes.STRING,
    length: DataTypes.INTEGER,
    started_date: DataTypes.DATE,
    ended_date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Course;
};
