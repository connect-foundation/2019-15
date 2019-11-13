require('dotenv').config();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const express = require('express');
const session = require('express-session');

// cors
const corsOptions = require('./config/corsOptions');
// passport
const passport = require('./config/passport');
// router
const apiRouter = require('./router/api');
const authRouter = require('./router/auth/auth');

const app = express();
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// session
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  }),
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/', function(req, res, next) {
  next();
});
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    status: err.status,
  });
});

module.exports = app;
