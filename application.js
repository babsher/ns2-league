var settings = require('./settings');
var express = require('express');
var MongoStore = require('connect-mongo')(express);
var passport = require('./auth');
var app = express();

app.sessionStore = new MongoStore(settings.mongo);

app.use(express.static(__dirname + '/public'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
app.use(express.cookieParser()); 
app.use(express.session({
   secret: settings.cookie_secret,
   store: app.sessionStore
}));

app.get('/auth/steam',
   passport.authenticate('steam'),
   function(req, res){
      // The request will be redirected to Steam for authentication, so
      // this function will not be called.
   });

app.get('/auth/steam/callback',
   passport.authenticate('steam', { failureRedirect: '/login' }),
   function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

function clientErrorHandler(err, req, res, next) {
   if (req.xhr) {
      res.send(500, { error: 'Something blew up!' });
   } else {
      next(err);
   }
}

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

module.exports = app;