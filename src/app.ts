const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
import * as cors from "cors";
import "reflect-metadata";
// game caro
const updateBalance = require("./routes/caro/updateBalance.route");
const updateGameComp = require("./routes/caro/updateGameComp.route");
const getLastGameId = require("./routes/caro/getLastGameId.route")
const getAmountInGame = require("./routes/caro/getAmountInGame.route")
const indexRouter = require("./routes/caro/index");

// game osu
const updateBalanceOsu = require("./routes/osu/updateBalance.route");
const updateGameOsu = require("./routes/osu/updateGame.route");
const getLastGameIdOsu = require("./routes/osu/getLastGameId.route")

//game chess
const updateBalanceChess = require("./routes/chess/updateBalance.route");
const updateGameChess = require("./routes/chess/updateGame.route");
const updateGameCompChess = require("./routes/chess/updateGameComp.route");
const getLastGameIdChess = require("./routes/chess/getLastGameId.route")
const getAmountInGameChess = require("./routes/chess/getAmountInGame.route")

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

// app.use("/", indexRouter);
app.use("/caro/updateBalance", updateBalance);
app.use("/caro/updateGameComp", updateGameComp);
app.use("/caro/getLastGameId", getLastGameId);
app.use("/caro/getGameByIdName", getAmountInGame);

app.use("/osu/updateBalance", updateBalanceOsu);
app.use("/osu/updateGame", updateGameOsu);
app.use("/osu/getLastGameId", getLastGameIdOsu);

app.use("/chess/updateBalance", updateBalanceChess);
app.use("/chess/updateGame", updateGameChess);
app.use("/chess/updateGameComp", updateGameCompChess);
app.use("/chess/getLastGameId", getLastGameIdChess);
app.use("/chess/getGameByIdName", getAmountInGameChess);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Osu-game-ptit/build')));
  console.log(path.join(__dirname, '../../Osu-game-ptit/build'));
  
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../../', 'Osu-game-ptit', 'build', 'index.html')
    )
  );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

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
