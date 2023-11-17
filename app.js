
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var Tea = require("./models/Tea");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var TeaRouter = require('./routes/Tea');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter= require('./routes/resource');

var app = express();

// view engine setup
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
app.use('/resource',resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

async function recreateDB(){
  // Delete everything
  await Tea.deleteMany();
    let instance1 = new Tea({Tea_flavour:"Black Tea", Tea_cost:50.00,Tea_quantity:15});
    let instance2 = new Tea({Tea_flavour:"Green Ta", Tea_cost:80.00,Tea_quantity:20});
    let instance3 = new Tea({Tea_flavour:"Cold Tea", Tea_cost:100.00,Tea_quantity:30});
    instance1.save().then(doc=>{
    console.log("First object saved")}
    ).catch(err=>{
    console.error(err)
    });
    instance2.save().then(doc=>{
      console.log("Second object saved")}
      ).catch(err=>{
      console.error(err)
      });
    instance3.save().then(doc=>{
        console.log("Third object saved")}
        ).catch(err=>{
        console.error(err)
        });
    }
    let reseed = true;
    if (reseed) {recreateDB();}
    

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;

