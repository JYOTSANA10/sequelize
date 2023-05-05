'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.User=require('./user')(sequelize,Sequelize)
db.details=require('./details')(sequelize,Sequelize)
db.Post =require('./post')(sequelize,Sequelize)
db.Tag =require('./tag')(sequelize,Sequelize)



db.User.hasOne(db.Post,{foreignKey:'user_id'})
db.userDetails= db.Post.belongsTo(db.User,{foreignKey:'user_id'})

db.userPost=db.User.hasMany(db.Post,{foreignKey:'user_id',as: 'posts'})
db.Post.belongsTo(db.User,{foreignKey:'user_id'})

db.postTag=db.Post.belongsToMany(db.Tag,{ through: 'post_tag',as: 'tags'})
db.Tag.belongsToMany(db.Post,{through:'post_tag'})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync({ force: false}).then(()=>{
//   console.log("re sync");
//   })


module.exports = db;
