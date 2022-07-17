const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
import * as cors from "cors";
import "reflect-metadata";
const updateBalance = require("./routes/updateBalance.route");
const updateGame = require("./routes/updateGame.route");
const updateGameComp = require("./routes/updateGameComp.route");
const getLastGameId = require("./routes/getLastGameId.route")
const getAmountInGame = require("./routes/getAmountInGame.route")

const indexRouter = require("./routes/index");

const db = require('./db')
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log(err))

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/updateBalance", updateBalance);
app.use("/updateGame", updateGame);
app.use("/updateGameComp", updateGameComp);
app.use("/getLastGameId", getLastGameId);
app.use("/getGameByIdName", getAmountInGame);

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

export default app;
