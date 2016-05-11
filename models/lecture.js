'use strict';
module.exports = function(sequelize, DataTypes) {
  var Lecture = sequelize.define('Lecture', {
    name: DataTypes.STRING,
    started_date: DataTypes.DATE,
    ended_date: DataTypes.DATE,
    teacher_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    course_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Lecture;
};