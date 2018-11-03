'use strict';
module.exports = (sequelize, DataTypes) => {
  const Windspeed = sequelize.define('Windspeed', {
    time: DataTypes.TIME,
    average_speed: DataTypes.NUMBER
  }, {});
  Windspeed.associate = function(models) {
    // associations can be defined here
  };
  return Windspeed;
};