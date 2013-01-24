var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;

passport.use(new SteamStrategy({
      returnURL: 'http://localhost:3000/auth/steam/return',
      realm: 'http://localhost:3000/'
   },
   function(identifier, done) {
      console.log(identifier);
   }
));

module.exports = passport;