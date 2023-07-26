var createError = require("http-errors");
var express = require("express");
var path = require("path");
require("dotenv").config();
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const trainsData = require("./models/trainModel");
var indexRouter = require("./routes/index");
var userRoutes = require("./routes/UserRoutes");
var adminRoutes = require("./routes/AdminRoutes");
const fs = require("fs");
const routesFilePath = path.join(__dirname, "routes.json");
const jsonData = fs.readFileSync(routesFilePath);
var app = express();
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((err) => console.log(err));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
