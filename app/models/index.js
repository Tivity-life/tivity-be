const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const db = {};
 const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.marker = require("../models/marker.model.js")(sequelize, Sequelize);

db.marker.belongsTo(db.user)

module.exports = db;
