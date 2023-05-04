const db = require("./models/index");
const Users = db.User;

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;


async function data_table(req, res,next) {

  
    const {draw,start,length,order,search} = req.query


    const column_name=["firstName","lastName","email","gender"]

      let columnOrder,orderDirection;
    if(order!== undefined){
      console.log(order[0]);

      const {column,dir}=order[0];
      console.log(dir);
      columnOrder=column_name[column];
      orderDirection=dir;

    }else{
      columnOrder="id";
      orderDirection="asc";
    }
    
   
          
    const query={
      where:{},
      order:[[columnOrder,orderDirection]] ,
      limit:parseInt(length),
      offset:parseInt(start)
    }

    if(search.value){

      query.where[Op.or]=[
        {firstName:{[Op.like]:search.value+"%"}},
        {lastName:{[Op.like]:search.value+"%"}},
        {email:{[Op.like]:search.value+"%"}},
        {gender:{[Op.like]:search.value+"%"}},

      ]
    }
    

    await Users.findAndCountAll(query)
    .then((data) => {
        res.json({
          draw:draw,
          recordsTotal:data.count,
          recordsFiltered:data.count,
          data:data.rows
        });
        
      })
      .catch((error) => {
        res.status(500).send(error);
      });
    }


  module.exports = {data_table}