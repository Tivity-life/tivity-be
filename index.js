const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tivity application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.findOrCreate({where:{
    id: 1,
    name: "user"
  },default:{
    id: 1,
    name: "user"
  }});

  Role.findOrCreate({where:{
    id: 2,
    name: "moderator"
  },default:{
    id: 2,
    name: "moderator"
  }});

  Role.findOrCreate({where:{
    id: 3,
    name: "admin"
  },default:{
    id: 3,
    name: "admin"
  }});
}