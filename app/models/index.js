const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const db = {};
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.marker = require("../models/marker.model.js")(sequelize, Sequelize);
db.event = require("../models/event.model.js")(sequelize, Sequelize);
db.todo = require("../models/todo.model.js")(sequelize, Sequelize);
db.habit = require("../models/habit.model.js")(sequelize, Sequelize);

db.marker.belongsTo(db.user);
db.event.belongsTo(db.user);
db.todo.belongsTo(db.user);
db.habit.belongsTo(db.user);

module.exports = db;
