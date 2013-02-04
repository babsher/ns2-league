var UserApi = require('./UserApi');

module.exports = function(app, db) {
   
   var userApi = new UserApi(db);
   
   function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
         return next();
      }
      res.send(404, 'User not authenticated');
   }
   
   // For user api only user can modify
   function ensureCurrentUser(req, res, next){
      if(req.session &&
         req.session.passport &&
         req.session.passport.user &&
         req.session.passport.user.steamid) {
         var steamid = req.session.passport.user.steamid;
         if(req.params.id === steamid) {
            next();
         }
         res.send(404, 'User not authorized.');
      }
   }
   
   // --------------- User API ---------------------
   
   app.get('/api/user/current', function(req, res){
      if(req.session &&
         req.session.passport &&
         req.session.passport.user &&
         req.session.passport.user.steamid) {
         
         res.send({
            username: req.session.passport.user.username,
            loggedIn: true,
            steamid: req.session.passport.user.steamid
         });
         console.dir(req.session.passport);
      } else {
         console.dir(req.session.passport);
         res.send(200, '{}');
      }
   });
   
   app.get('/api/users/:id', function(req, res){
      userApi.getUserProfile(
         req.params.id,
         function(err, result){
            if(err){
               console.dir(err);
               res.send(500,"Server error");
               return;
            }
            res.send(200, result)
         }
      );
   });
   
   app.post('/api/users/:id', ensureAuthenticated, function(req, res) {
      console.dir(req);
      userApi.updateUserProfile(
         req.params.id,
         {}, // TODO add profile here
         function(err, result){
            if(err){
               console.dir(err);
               res.send(500,"Server error");
               return;
            }
            res.send(200, result)
         }
      );
   });
   
   // ------------------ Forum API ---------------------------
   
   app.get('/api/forums', function(req, res){
      res.send(200, [{name: 'f1'}, {name:'f2'}]);
   });
};