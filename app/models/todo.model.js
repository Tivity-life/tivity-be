module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      label: {
        type: Sequelize.STRING,
      },
      done: {
        type: Sequelize.BOOLEAN,
      },
    });
  
    return Todo;
  };
  