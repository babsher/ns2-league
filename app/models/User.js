// User Model
module.exports = require('./model').extend({
   
   urlRoot: '/api/users',
   
   defaults: {
      loggedIn: false,
      username: "",
      password: "",
      session: "",
      pickup: ""
   },
   
   toggleLogin: function() {
      this.save({loggedIn: !this.get('loggedIn')});
   }
});