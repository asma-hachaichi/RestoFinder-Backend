const express = require("express");
const db = require("./configuration/database.js");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

//Test connection
db.authenticate()
  .then(() => console.log("Database connected ..."))
  .catch((err) => console.log("error : " + err));
  
const app = express();
app.use(jsonParser);

//Inserting models
const chef = require("./models/chef.js");
const feedback = require("./models/feedback.js");
const menu = require("./models/menu.js");
const resto = require("./models/resto.js");

//Model dependencies
resto.hasMany(chef);
chef.belongsTo(resto);
resto.hasMany(menu);
menu.belongsTo(resto);

//Routes
const chefRouter = require("./routes/chefRoute");
const restoRouter = require("./routes/restoRoute");
const feedbackRouter = require("./routes/feedbackRoute");
const menuRouter = require("./routes/menuRoute.js");

var cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,PUT,POST",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use("/menu", menuRouter);
app.use("/resto", restoRouter);
app.use("/feedback", feedbackRouter);
app.use("/chef", chefRouter);

app.use("/", (req, res) => {
  res.send("Hello World form NodeJS express.");
});

db.sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const PORT = 5000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
module.exports = app;
