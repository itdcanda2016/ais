'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    class_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    related_comment_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      isYours: function(user) {
        return this.user_id == user.id;
      }
    }
  });
  return Comment;
};
