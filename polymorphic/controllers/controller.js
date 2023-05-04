var db = require("../models");

const Image = db.image;
const Comment = db.comment;
const Video = db.video;
const tags = db.tags;
const tag_taggable = db.tag_taggable;

async function onetomany(req, res) {
  const data = await Image.create(
    {
      title: req.body.title,
      url: req.body.url,
      comments: req.body.comments,
    },
    {
      include: [db.comment],
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function onetomanyVideo(req, res) {
  const data = await Video.create(
    {
      title: req.body.title,
      url: req.body.url,
      comments: req.body.comments,
    },
    {
      include: [db.comment],
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function manytomanyImage(req, res) {
  console.log(req.body.tags);
  const data = await Image.create(
    {
      title: req.body.title,
      url: req.body.url,
      comments: req.body.comments,
      tags: req.body.tags,
    },
    {
      include: [tags, db.comment],
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function manytomanyVideo(req, res) {
  const data = await Image.create(
    {
      title: req.body.title,
      url: req.body.url,
      comments: req.body.comments,
      tags: req.body.tags,
    },
    {
      include: [tags, db.comment],
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function findOneImage(req, res) {
  const data = await Image.findAll({
    include: [db.comment],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function findOneVideo(req, res) {
  const data = await Video.findAll({
    include: [db.comment],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function findManyImage(req, res) {
  const data = await Image.findAll({
    include: [tags, db.comment],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

async function findManyVideo(req, res) {
  const data = await Video.findAll({
    include: [tags, db.comment],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
}

module.exports = {
  onetomany,
  onetomanyVideo,
  manytomanyImage,
  manytomanyVideo,
  findOneImage,
  findOneVideo,
  findManyImage,
  findManyVideo,
};
