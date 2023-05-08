'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class select_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  select_master.init({
    select_type: DataTypes.STRING,
    select_name: DataTypes.STRING,
    select_key: DataTypes.STRING,
    multiple_allow: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'select_master',
  });
  return select_master;
};