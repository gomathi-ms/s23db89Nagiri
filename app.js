const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');

require('dotenv').config();

const Account = require('./models/account');
const Tea = require('./models/Tea');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const TeaRouter = require('./routes/Tea');
const boardRouter = require('./routes/board');
const chooseRouter = require('./routes/choose');
const resourceRouter = require('./routes/resource');

const app = express();

// Passport configuration
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
 
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
 
        // Use the authenticate method provided by passport-local-mongoose
        user.authenticate(password, function (err, isValid) {
          if (err) {
            return done(err);
          }
         
          if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
          }
         
          return done(null, user);
        });
      })
      .catch(function (err) {
        return done(err);
      });
  }
));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Tea', TeaRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connection to DB succeeded');
});

async function recreateDB() {
  await Tea.deleteMany();
  const teas = [
    { Tea_flavour: 'Black Tea', Tea_cost: 50.00, Tea_quantity: 15 },
    { Tea_flavour: 'Green Tea', Tea_cost: 80.00, Tea_quantity: 20 },
    { Tea_flavour: 'Cold Tea', Tea_cost: 100.00, Tea_quantity: 30 }
  ];

  for (const teaData of teas) {
    const tea = new Tea(teaData);
    try {
      await tea.save();
      console.log('Tea object saved:', teaData);
    } catch (err) {
      console.error(err);
    }
  }
}

const reseed = true;
if (reseed) {
  recreateDB();
}

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
