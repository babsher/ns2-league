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
         //,profile: true
      },
      function(identifier, profile, done) {
         // asynchronous verification, for effect...
         process.nextTick(function () {
            console.log('Got profile ' + profile);
            console.log(profile);

            // To keep the example simple, the user's Steam profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Steam account with a user record in your database,
            // and return that user instead.
            profile.identifier = identifier;
            
            var id = idReg.exec(identifier);
            if(id) {
               profile.steamid = id[1];
               s.getPlayerSummaries({
                  steamids: [profile.steamid],
                  callback: function(err, data) {
                     console.log('Profile ' + JSON.stringify(data));
                     profile.username = data.response.players[0].personaname;
                     done(null, profile);
                  }
               });
            }
         });
      }
   ));
   
   return passport;
};