const db = require("../models/index");
const Select = db.select;
const Option = db.option;

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

async function selectMaster(req, res) {
  const { type, s_name, option } = req.body;
  console.log(option[0]);
  var type_name, htmlSyntax;

  if (type == 1) {
    type_name = "radio";
    htmlSyntax = `<label for="${s_name}">${s_name}</label>`;
    for (var i = 0; i < option.length; i++) {
      htmlSyntax += `<input type="radio" id="${option[i].option_name}" name="${s_name}" value="${option[i].option_name}"><label for="${option[i].option_name}">${option[i].option_name}</label>`;
    }
  } else if (type == 2) {
    type_name = "checkbox";
    htmlSyntax = `<label for="${s_name}">${s_name}</label><br>`;

    for (var i = 0; i < option.length; i++) {
      htmlSyntax += `<label><input type="checkbox" name="html" value="${option[i].option_name}"> ${option[i].option_name}</label><br />`;
    }
  } else if (type == 3) {
    type_name = "combobox";
    htmlSyntax = `<label for="cars">Choose ${s_name}:</label><select name="${s_name}" id="${s_name}">`;
    for (var i = 0; i < option.length; i++) {
      htmlSyntax += `<option value="${option[i].option_name}">${option[i].option_name}</option>`;
    }
    htmlSyntax += `</select>`;
  }

  await Select.create(
    {
      select_type: type_name,
      select_name: s_name,
      option_masters: [...option],
    },
    {
      include: [Option],
    }
  )
    .then((data) => {
      res.send(htmlSyntax);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function selectMasterSelect(req, res) {
  await Select.findAll({
    attributes: ["id", "select_type", "select_name"],
    include: [
      {
        model: Option,

        attributes: ["id", "option_name", "select_id"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function selectMasterUpdate(req, res) {
  const { type, s_name, option } = req.body;
  console.log(option);
  var type_name, htmlSyntax;

  if (type == 1) {
    type_name = "radio";
    htmlSyntax = `<label for="${s_name}">${s_name}</label>`;
    for (var i = 0; i < option.length; i++) {
      htmlSyntax += `<input type="radio" id="${option[i].option_name}" name="${s_name}" value="${option[i].option_name}"><label for="${option[i].option_name}">${option[i].option_name}</label>`;
    }
  } else if (type == 2) {
    type_name = "checkbox";
    htmlSyntax = `<label for="${s_name}">${s_name}</label><br>`;

    for (var i = 0; i < option.length; i++) {
      htmlSyntax += `<label><input type="checkbox" name="html" value="${option[i].option_name}"> ${option[i].option_name}</label><br />`;
    }
  } else if (type == 3) {
    type_name = "combobox";
    htmlSyntax = `<label for="cars">Choose ${s_name}:</label><select name="${s_name}" id="${s_name}">`;
    for (var i = 0; i < option.length; i++) {
      htmlSyntax += `<option value="${option[i].option_name}">${option[i].option_name}</option>`;
    }
    htmlSyntax += `</select>`;
  }
  console.log(req.body.id);
  const option_id = await Option.findAll({
    attributes: ["id"],
    where: {
      select_id: req.body.id,
    },
  });
  console.log("option", option_id[0].id);

  await Select.update(
    {
      option_name: option[i].option_name,
    },
    {
      where: {
        id: option_id[i].id,
      },
    }
  );

  await Select.update(
    {
      select_type: type_name,
      select_name: s_name,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((data) => {
      res.send(htmlSyntax);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

module.exports = {
  selectMaster,
  selectMasterSelect,
  selectMasterUpdate,
};
