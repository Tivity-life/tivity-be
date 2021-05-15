module.exports = (sequelize, Sequelize) => {
    const Marker = sequelize.define("markers", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      posLat: {
        type: Sequelize.REAL
      },
      posLon: {
        type: Sequelize.REAL
      },
      posts: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    });
  
    return Marker;
  };
  