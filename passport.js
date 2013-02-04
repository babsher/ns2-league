var config = require('./settings');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var steam = require('steam-web');

module.exports = function(userApi) {
   var idReg = /http:\/\/steamcommunity.com\/openid\/id\/(\d+)/;
   var s = new steam({
      apiKey: config.steamKey,
      format: 'json'
   });
   
   var createUser = function(profile, done){
      s.getPlayerSummaries({
         steamids: [profile.steamid],
         callback: function(err, data) {
            console.log('creating user', data);
            if(err) {
               done(err);
               return console.dir(err);
            }
            if(data.response.players && data.response.players[0]) {
               var player = data.response.players[0];
               console.dir(player);
               profile.user = {username: player.personaname};
               userApi.updateUserProfile(profile.steamid, profile.user, function(){
                  done(null, profile);
               });
            }
         }
      });
   }

   passport.serializeUser(function(user, done) {
      done(null, user);
   });

   passport.deserializeUser(function(obj, done) {
      done(null, obj);
   });

   // Use the SteamStrategy within Passport.
   //   Strategies in passport require a `validate` function, which accept
   //   credentials (in this case, an OpenID identifier and profile), and invoke a
   //   callback with a user object.
   passport.use(new SteamStrategy({
         returnURL: 'http://' + config.hostname + '/auth/steam/return',
         realm: 'http://' + config.hostname + '/'
      },
      function(identifier, profile, done) {
         // asynchronous verification, for effect...
         process.nextTick(function () {
            // To keep the example simple, the user's Steam profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Steam account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
            
            var idResult = idReg.exec(identifier);
            if(idResult && idResult[1] && idResult[1] != "") {
               profile.steamid = idResult[1];
               userApi.getUserProfile(profile.steamid, function(err, result){
                  if(err) {
                     done(err);
                     return console.dir(err);
                  }
                  
                  if(result){    // if we got a user already stored with that id
                     console.log('got profile', result);
                     profile.user = result;
                     done(null, profile);
                  } else {       // Create a new user
                     createUser(profile, done);
                  }
               });
            }
         });
      }
   ));
   
   return passport;
};