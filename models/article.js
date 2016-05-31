'use strict';
module.exports = function(sequelize, DataTypes) {
  var Article = sequelize.define('Article', {
    user_id: DataTypes.INTEGER,
    article_type_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {

      }
    },
    instanceMethods: {
      isYours: function(user) {
        return this.user_id == user.id;
      }
    }
  });
  return Article;
};
