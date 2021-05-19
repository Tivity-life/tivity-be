module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("events", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      target: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      startTime: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      endTime: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
    });
  
    return Event;
  };
  