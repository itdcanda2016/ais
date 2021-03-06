'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    related_url: DataTypes.STRING,
    image_url: DataTypes.STRING,
    course_id: DataTypes.INTEGER
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
  return Product;
};
