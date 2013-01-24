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
   passport.authenticate('steam', { failureRedirect: '/' }),
   function(req, res){
      // The request will be redirected to Steam for authentication, so
      // this function will not be called.
   });

app.get('/auth/steam/return',
   passport.authenticate('steam', { failureRedirect: '/' }),
   function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/user');
});

app.get('/user', ensureAuthenticated, function(req, res){
   res.send(200, 'hello')
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

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