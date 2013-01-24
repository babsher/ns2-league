// User Model
module.exports = require('./model').extend({
   
   defaults: {
      loggedIn: false,
      username: "",
      password: "",
      session: ""
   },
   
   toggleLogin: function() {
      this.save({loggedIn: !this.get('loggedIn')});
   }
});