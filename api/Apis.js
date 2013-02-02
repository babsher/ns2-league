var UserApi = require('./UserApi');

module.exports = function(app, db) {
   
   function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.send(404, 'User not authenticated');
   }
   
   app.get('/api/user/current', ensureAuthenticated, function(req, res){
      if(req.session.passport && req.session.passport.user.steamid) {
         res.send({username:req.session.passport.user.username, loggedIn: true});
      }
   });
}