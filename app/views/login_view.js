var View = require('./view');
var User = require('../models/User');
var template = require('./templates/login');

module.exports = View.extend({
   id: 'login-view',
   template: template,
   
   initialize: function() {
      this.model = new User();
      this.model.on('change', this.render, this);
      this.model.fetch();
   },
   
   getRenderData: function() {
      return {
         loggedIn: this.model.get('loggedIn'),
         username: this.model.get('username')
      };
   }
});