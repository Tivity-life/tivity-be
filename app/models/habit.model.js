module.exports = (sequelize, Sequelize) => {
    const Habit = sequelize.define("habits", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      insert: {
        type: Sequelize.STRING,
      },
      isActiveMonday: {
        type: Sequelize.BOOLEAN
      },
      isActiveTuesday: {
        type: Sequelize.BOOLEAN
      },
      isActiveWednesday: {
        type: Sequelize.BOOLEAN
      },
      isActiveThursday: {
        type: Sequelize.BOOLEAN
      },
      isActiveFriday: {
        type: Sequelize.BOOLEAN
      },
      isActiveSaturday: {
        type: Sequelize.BOOLEAN
      },
      isActiveSunday: {
        type: Sequelize.BOOLEAN
      },
      n: {
        type: Sequelize.REAL
      }
    });
  
    return Habit;
  };
