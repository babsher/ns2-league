// Session Model
module.exports = require('./model').extend({
   
   url: function() {return '/api/user/current';},
   
   defaults: {
      loggedIn: false,
      username: "",
      pickup: ""
   },
   
   toggleLogin: function() {
      this.save({loggedIn: !this.get('loggedIn')});
   }
});