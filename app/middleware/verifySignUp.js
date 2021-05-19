const { compareSync } = require("bcryptjs");
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!",
        });
        return;
      }
      console.log("==");
      // Email
      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!",
          });
          return;
        }

        next();
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("==2");
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
