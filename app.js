const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const userRouter = require("./routes/users");
const bookingRouter = require("./routes/bookings");
const indexRouter = require("./routes/index");
const roomRouter = require("./routes/rooms");
const callRouter = require("./routes/call");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const conneection = mongoose.connection;
conneection.once("open", () => {
  console.log("MangoDB database connection established successfully");
});
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/rooms", roomRouter);
app.use("/bookings", bookingRouter);
app.use("/call", callRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
