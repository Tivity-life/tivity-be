const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/getUser", controller.getUser);
  app.get("/api/user/getMarkers", controller.getUserMakers);
  app.post("/api/user/createMarker", controller.createMarker);
  app.post("/api/user/removeMarker", controller.removeMarker);
  app.post("/api/user/deletePost", controller.deletePost);
  app.post("/api/user/addPost", controller.addPost);

  app.get("/api/user/getEvents", controller.getEvents);
  app.post("/api/user/createEvent", controller.createEvent);

  app.get("/api/user/getTodos", controller.getTodos);
  app.post("/api/user/createTodo", controller.createTodo);
  app.post("/api/user/updateTodo", controller.updateTodo);
  app.post("/api/user/removeTodo", controller.deleteTodo);
};
