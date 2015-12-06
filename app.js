var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var movies = require('./routes/movies');
var addcomment = require('./routes/addcomment');
var vote = require('./routes/vote');
var login = require('./routes/login');
var signup = require('./routes/signup');

var genres= require('./routes/genres');
var movie=require('./routes/movie');
var persons = require('./routes/persons');
var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var session = require('express-session');

var dbConfig = require('./routes/userdb.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
app.use(session({ secret: 'supernova', saveUninitialized: true, resave: false})); // session secret
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
require('./routes/userRoute.js')(app, passport); 
//require('./routes/signup.js')(app, passport);
require('./routes/signup.js')(passport);
require('./routes/login.js')(passport);
require('./routes/facebook.js')(passport);

passport.serializeUser(function(user, done) {
	done(null, user._id);
});
	 
//passport.deserializeUser(function(id, done) {
//	User.findById(id, function(err, user) {
//		done(err, user);
//	});
//});


app.use('/', routes);
app.use('/users', users);
app.get('/vote', vote.displayResponse);
//app.get('/index',index.generateResponse);
app.get('/login', login);
app.get('/signup', signup);
app.get('/movies', movies.displayResponse);
app.get('/persons', persons.displayResponse);
app.get('/getGenre',genres.displayResponse);
app.get('/getMovies',movie.displayResponse);
app.get('/addcomment',addcomment.displayResponse);
app.get('/linktomovie',movies.displayResponse);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
