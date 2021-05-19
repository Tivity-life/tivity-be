const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("sequelize");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

function checkAccessToken(token) {
  try {
    return jwt.verify(token, config.secret);
  } catch (err) {
    return false;
  }
}

exports.getUser = (req, res) => {
  const decToken = checkAccessToken(req.headers["x-access-token"]);
  if (decToken) {
    db.user
      .findOne({ where: { id: decToken.id} })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(500).send({ message: "Something went wrong" });
  }
};

exports.getUserMakers = (req, res) => {
  db.marker
    .findAll({ where: { userId: req.query.userId } })
    .then((markers) => {
      res.status(200).send(markers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.createMarker = (req, res) => {
  const marker = {
    id: uuidv4(),
    posLat: req.body.posLat,
    posLon: req.body.posLon,
    posts: [],
    userId: req.body.userId,
  }
  db.marker
    .create(marker)
    .then(() => {
      res.status(200).send(marker);
    })
    .catch((err) => {
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
          res.status(200);
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
