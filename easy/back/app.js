require("dotenv").config();
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const http = require("http");
const socketIo = require("socket.io");

// cors
const corsOptions = require("./config/corsOptions");
// passport
const passport = require("./util/passport");
// router
const apiRouter = require("./router/api");
const authRouter = require("./router/auth/auth");

/**
 *
 *
 * @description 리뷰 요청합니다
 * 소켓을 사용하는 코드인데 익스프레스 제너레이터를 써서 소켓메세지 핸들러를 어디서 주입시켜줘야할지 고민했습니다
 * 코드는 app.js 에서 하는게 맞다고 생각해서 주입코드를 외부에 선언하고 app.js로 불러와서 초기화 해주었습니다.
 */
// create express server
const app = express();

// create http server
const server = http.createServer(app);

// create socket handler
const io = socketIo(server);
const initSocketIO = require("./socket");

// initSocket
initSocketIO(io);
/////////////////////////////////////////////////////////////////////////////////////////
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use("/", function(req, res, next) {
  next();
});
app.use("/api", apiRouter);
app.use("/auth", authRouter);

// error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: err.status
  });
});

module.exports = { app, server };
