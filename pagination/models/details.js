'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // details.belongsTo(models.User,{foreignKey:'id'})
      // define association here
    }
  }
  details.init({
    father_name: DataTypes.STRING,
    mother_name: DataTypes.STRING,
    no:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'details',
  });
  return details;
};