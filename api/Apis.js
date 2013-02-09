var UserApi = require('./UserApi');
var ForumsApi = require('./ForumsApi');

module.exports = function(app, db) {
   
   var userApi = new UserApi(db);
   var forumsApi = new ForumsApi(db);
   
   function format(data){
      if(Array.isArray(data)){
         for(var i = 0; i < data.length; i++){
            data[i] = format(data[i]);
         }
      } else {
         data.id = data._id;
      }
      return data;
   }
   
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
            var obj = result;
            obj.id = result._id;
            res.send(200, obj);
         }
      );
   });
   
   app.post('/api/users/:id', ensureAuthenticated, function(req, res) {
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
      forumsApi.getForums(function(err, results){
         if(err){
            console.dir(err);
            res.send(500, "Server Error");
            return;
         }
         res.json(200, format(results));
      });
   });
};