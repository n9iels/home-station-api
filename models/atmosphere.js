'use strict';
module.exports = (sequelize, DataTypes) => {
  const Atmosphere = sequelize.define('Atmosphere', {
    time: DataTypes.TIME,
    temperature: DataTypes.NUMBER,
    humidity: DataTypes.NUMBER,
    heatindex: DataTypes.NUMBER
  }, {});
  Atmosphere.associate = function(models) {
    // associations can be defined here
  };
  return Atmosphere;
};