var View = require('./view');
var LoginView = require('./login_view');
var template = require('./templates/home');

module.exports = View.extend({
   id: 'home-view',
   classes: 'container',
   template: template,
   login: new LoginView(this.user),
                             
   afterRender: function(){
      this.assign( {
         '.login-view': this.login
      });
   }
});