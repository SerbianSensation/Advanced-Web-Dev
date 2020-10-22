require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/config/passport');

var routesApi = require('./app_api/routes/index');

var app = express();

//set port to 80
app.set('port', 80);

//copied from todo app to make jquery/bootstrap work
app.use(express.static(path.join(__dirname, 'public')));
//redirect bootstrap js
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
//redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
//redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/webfonts', express.static(__dirname + '/public/fonts/webfonts/'));

//redirect Angular js
app.use('/js', express.static(__dirname + '/node_modules/angular'));
app.use('/js', express.static(__dirname + '/node_modules/angular-route'));
app.use('/js', express.static(__dirname + '/node_modules/angular-ui-router/release'));
//redirect app_client for bloggerApp js
app.use('/js', express.static(__dirname + '/app_client'));

//Initialize passport
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//include app_client directory
app.use(express.static(path.join(__dirname, 'app_client')));

app.use('/api', routesApi);

//use index.html from app_client (Angular front-end)
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
