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
      Backbone.user.id='1234';
      Backbone.user.save();
      //Backbone.sync('read', Backbone.user, {url: '/users/:id'});
      console.log(Backbone.user);
   }
});