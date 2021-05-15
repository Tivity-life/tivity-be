const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("sequelize");

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.getUser = (req, res) => {
  db.user
    .findOne({ where: { id: req.body.userId } })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.getUserMakers = (req, res) => {
  db.marker
    .findAll({ where: { userId: req.body.userId } })
    .then((markers) => {
      res.status(200).send(marker);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.createMarker = (req, res) => {
  db.marker
    .create({
      id: uuidv4(),
      posLat: req.body.posLat,
      posLon: req.body.posLon,
      posts: [],
      userId: req.body.userId,
    })
    .then(() => {
      res.status(200).send({ message: "Marker added successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.removeMarker = (req, res) => {
  db.marker
    .findOne({
      id: req.body.markerId,
    })
    .then((marker) => {
      marker
        .destroy()
        .then(() => {
          res.status(200).send({ message: "Marker removed successfully!" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.addPost = (req, res) => {
  db.marker
    .update(
      {
        posts: sequelize.fn(
          "array_append",
          sequelize.col("posts"),
          req.body.post
        ),
      },
      { where: { id: req.body.markerId } }
    )
    .then(() => {
      res.status(200).send({ message: "Post added successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.deletePost = (req, res) => {
  db.marker
    .update(
      {
        posts: sequelize.fn(
          "array_remove",
          sequelize.col("posts"),
          req.body.post
        ),
      },
      { where: { id: req.body.markerId } }
    )
    .then(() => {
      res.status(200).send({ message: "Post deleted successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
