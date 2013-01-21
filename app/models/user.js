// User Model
module.exports = require('./model').extend({
   
   defaults: {
      loggedIn: false
   },
   
   toggleLogin: function() {
      this.save({loggedIn: !this.get('loggedIn')});
   }
});