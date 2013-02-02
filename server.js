var MongoClient = require('mongodb').MongoClient;
var settings = require('./settings');
// var UserApi = require('./api/UserApi');
var _db = null;

function connectMongo() {
   MongoClient.connect(settings.mongoUri, function(err, result) {
      if(err) {return console.dir(err);}
      _db = result;
      configureAuthentication();
   });
}

function configureAuthentication() {
   new UserApi(_db, function(err, userApi) {
      var passport = require('./passport')(userApi);
      configureExpress(passport);
   });
}

function configureExpress(passport) {
   var express = require('express');
   var app = express();
   var MongoStore = require('connect-mongo')(express);
   
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

   app.sessionStore = new MongoStore(settings.mongo);
      
   // configure Express
   app.configure(function() {
      app.use(express.static(__dirname + '/public'));
      app.use(express.logger());
      app.use(express.cookieParser());
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(express.session({
         secret: settings.cookie_secret,
         store: app.sessionStore
      }));
      // Initialize Passport!  Also use passport.session() middleware, to support
      // persistent login sessions (recommended).
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(app.router);
      app.use(logErrors);
      app.use(clientErrorHandler);
      app.use(errorHandler);
   });
   
   var Authentication = require('./authentication')(app, passport);
   
   require('./api/Apis')(app, _db);
   
   var server = require('http').createServer(app);
   var io = require('socket.io').listen(server);
   require('./sockets').configure(io, app.sessionStore);
   server.listen(3000);
}

connectMongo();