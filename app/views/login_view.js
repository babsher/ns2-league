var View = require('./view');
var template = require('./templates/login');

module.exports = View.extend({
   id: 'login-view',
   template: template,
   
   events: {
      "click .steam-login": "login"
   },
   
   getRenderData: function() {
      return {
         loggedIn: Backbone.user.get('loggedIn')
      };
   },
   
   login: function() {
      console.log("Logging in to steam.");
   }
});