const Sequelize = require("sequelize");
// const dbName='customer';
// const dbUser='root';
// const dbPass='root';

const sequelize= new Sequelize('customer','root','root',{
    host:'localhost',
    // logging:false,
    dialect:'mysql'
})

sequelize.authenticate().then(()=>{
    console.log("connected");
}).catch(err=>{
    console.log("error");
})

const db ={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

db.customers=require('./customer')(sequelize,Sequelize)

db.sequelize.sync().then(()=>{
    console.log("sync");
})

module.exports=db;