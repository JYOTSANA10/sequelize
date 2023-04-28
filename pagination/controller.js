const db = require("./models/index");
const Customer = db.User;
const Details = db.details;
const Post = db.Post;

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function oneToOne(req, res) {
  await Customer.findAll({
    attributes: ["firstName", "lastName", "email"],
    include: [
      {
        model: Details,

        attributes: ["id", "father_name", "mother_name"],
      },
    ],
    where: { id: 73 },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function manyToMany(req, res) {
  await Customer.findAll({
    attributes: ["firstName", "lastName", "email"],
    include: [
      {
        model: Post,
        association:db.userPost,
        attributes: ["id", "post_image", "tag"],
        
        include :[
          {
            association:db.postTag,
            model: db.Tag,
            as: 'tags',
            attributes: ["id", "tag_name"],
          }
        ]
      },
    ],
    where: { id: 81 },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
}

async function oneToOneCreate(req, res) {
  const mother_name = req.body.mother_name;
  const father_name = req.body.father_name;

  await Customer.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,

      email: req.body.email,
      detail: [
        {
          father_name: father_name,
          mother_name: mother_name,
        },
      ],
    },
    {
      include: [Details],
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function oneToManyCreate(req, res) {
  const post = req.body.post;
  await Customer.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,

      email: req.body.email,
      Posts: [...post],
      
    },
    {
      include: [db.Post],
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

 async function oneToManyUpdate(req,res){

  const post = req.body.posts;
  console.log(req.body.id);
  // console.log(post);

//   const customerObject={
        
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,

//     email: req.body.email,
//     post : req.body.post

      
// }
// var filter = {
//   where: {
//     id: req.query.id
//   },
//   include: [
//     { model: db.Post}
//   ]
// };

  await  Customer.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,

    email: req.body.email,
    posts : post,
      include: [db.Post]
    },
    {
      where: {
      id: req.body.id
    }
  }).then(data=>{
      res.send(data)
  }).catch(error=>{
    console.log(error);
      res.status(500).send(error);
  })
}

async function manyToManyCreate(req, res) {
  const post = req.body.posts;
  const tag = req.body.tag;

  await Customer.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,

      email: req.body.email,
      posts: [...post],
    },
    {
      include:[{association:db.userDetails},
        {
        association:db.userPost,
        include:[db.postTag]
      }
      ]
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function manyToManyUpdate(req,res){

  const customerObject={
      
      name:req.body.name,
      email:req.body.email,
      age:req.body.age
  }

  Customer.update(customerObject,{
      where:{id:req.params.id}
  }).then(data=>{
      res.send(data)
  }).catch(error=>{
      res.status(500).send(error);
  })
}


async function paranoid(req, res) {
  await Customer.findAll({
    where: { id: 6 },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function allCustomer(req, res) {
  page = req.query.page;
  let limit = 10;
  let offset = (page - 1) * limit;

  await Customer.findAll({
    limit: limit,
    offset: offset,
    // order: [["id", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

function searchCustomer(req, res) {
  fname = req.query.fname;
  lname = req.query.lname;

  Customer.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            {
              firstName: {
                [Op.like]: fname + "%",
              },
            },
            {
              lastName: {
                [Op.like]: lname + "%",
              },
            },
          ],
        },

        {
          firstName: {
            [Op.like]: fname + "%",
          },
        },
        {
          lastName: {
            [Op.like]: lname + "%",
          },
        },
      ],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function sortCustomer(req, res) {
  sort = req.query.sort;
  sort_order = req.query.sort_order;
  page = req.query.page;
  let limit = 5;
  let offset = (page - 1) * limit;

  await Customer.findAll({
    limit: limit,
    offset: offset,
    order: [[sort, sort_order]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

module.exports = {
  allCustomer,
  searchCustomer,
  sortCustomer,
  oneToOne,
  paranoid,
  oneToOneCreate,
  oneToManyCreate,
  manyToManyCreate,
  manyToMany,
  oneToManyUpdate
};
