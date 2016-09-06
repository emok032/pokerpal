'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    zipcode: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    apt: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Game.belongsToMany(models.User);
      }
    }
  });
  return Game;
};