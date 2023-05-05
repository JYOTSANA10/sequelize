const db = require("./models/index");
const Users = db.User;

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function data_table(req, res, next) {
  const { draw, start, length, order, search, columns } = req.query;
  console.log(columns[4].data);

  //  const column_name = ["firstName", "lastName", "email", "gender", "city"];

  let columnOrder, orderDirection, orders;
  if (order !== undefined) {
    const { column, dir } = order[0];
    console.log(columns[column].data);

    if (column == 4) {
      orders = [[{ model: db.Details }, "city", dir]];
    } else if (column == 5) {
      orders = [[{ model: db.Contact }, "contact_no", dir]];
    } else {
      columnOrder = columns[column].data;
      orderDirection = dir;
      orders = [[columnOrder, orderDirection]];
    }
  } else {
    columnOrder = "id";
    orderDirection = "asc";
    orders = [[columnOrder, orderDirection]];
  }

  const query = {
    subQuery: false,
    where: {},
    // order: [[ {model: db.Details} , columnOrder, orderDirection]],
    order: orders,
    limit: parseInt(length),
    offset: parseInt(start),
    include: [
      {
        model: db.Details,
        attributes: ["city"],
      },
      {
        model: db.Contact,
      },
    ],
  };

  if (search.value) {
    query.where[Op.or] = [
      { firstName: { [Op.like]: search.value + "%" } },
      { lastName: { [Op.like]: search.value + "%" } },
      { email: { [Op.like]: search.value + "%" } },
      { gender: { [Op.like]: search.value + "%" } },
      {
        "$Contacts.contact_no$": {
          [Op.like]: `${search.value}%`,
        },
      },
      {
        "$Detail.city$": {
          [Op.like]: `${search.value}%`,
        },
      },
    ];
  }

  await Users.findAndCountAll(query)
    .then((data) => {
      res.json({
        draw: draw,
        recordsTotal: data.count,
        recordsFiltered: data.count,
        data: data.rows,
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

module.exports = { data_table };
