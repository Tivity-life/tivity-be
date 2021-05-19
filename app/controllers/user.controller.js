const db = require("../models");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("sequelize");
const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

function checkAccessToken(token) {
  try {
    return jwt.verify(token, config.secret);
  } catch (err) {
    console.log("checkAccessToken", err);
    console.log("checkAccessToken", token, config.secret);
    return false;
  }
}

exports.getUser = (req, res) => {
  const decToken = checkAccessToken(req.headers["x-access-token"]);
  console.log(decToken);
  if (decToken) {
    db.user
      .findOne({ where: { id: decToken.id } })
      .then(user => {
        res.status(200).send(user);
      })
      .catch(err => {
        console.log("checkAccessToken", err);
        res.status(500).send({ message: err.message });
      });
  } else {
    res.status(500).send({ message: "Something went wrong" });
  }
};

exports.getUserMakers = (req, res) => {
  db.marker
    .findAll({ where: { userId: req.query.userId } })
    .then(markers => {
      res.status(200).send(markers);
    })
    .catch(err => {
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
  };
  db.marker
    .create(marker)
    .then(() => {
      res.status(200).send(marker);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.removeMarker = (req, res) => {
  db.marker
    .findOne({
      id: req.body.markerId,
    })
    .then(marker => {
      marker
        .destroy()
        .then(() => {
          res.status(200);
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
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
    .catch(err => {
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
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.getEvents = (req, res) => {
  db.event
    .findAll({
      where: { userId: req.query.userId },
      order: [
        ["target", "ASC"],
        ["startTime", "ASC"],
        ["endTime", "ASC"],
      ],
    })
    .then(events => {
      res.status(200).send(events);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.createEvent = (req, res) => {
  const event = {
    id: uuidv4(),
    name: req.body.name,
    target: req.body.target,
    startTime:
      req.body.startTime > req.body.endTime
        ? req.body.endTime
        : req.body.startTime,
    endTime:
      req.body.startTime > req.body.endTime
        ? req.body.startTime
        : req.body.endTime,
    userId: req.body.userId,
  };

  console.log(req.body);

  db.event
    .create(event)
    .then(() => {
      res.status(200).send(event);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getTodos = (req, res) => {
  db.todo
    .findAll({
      where: { userId: req.query.userId },
      order: [["createdAt", "ASC"]],
    })
    .then(todos => {
      res.status(200).send(todos);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.createTodo = (req, res) => {
  console.log("body", req.body);
  const todo = {
    id: uuidv4(),
    label: req.body.label,
    done: req.body.done,
    userId: req.body.userId,
  };

  db.todo
    .create(todo)
    .then(() => {
      res.status(200).send(todo);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateTodo = (req, res) => {
  const todo = {
    label: req.body.label,
    done: req.body.done,
  };

  db.todo
    .update(todo, { where: { id: req.body.todoId } })
    .then(() => {
      res.status(200).send(todo);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

exports.deleteTodo = (req, res) => {
  const todo = {
    label: req.body.label,
    done: req.body.done,
  };

  db.todo
    .destroy({
      where: { id: req.body.todoId },
    })
    .then(() => {
      res.status(200).send(todo);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};
