var View = require('./view');
var Session = require('../models/Session');
var template = require('./templates/login');

module.exports = View.extend({
   id: 'login-view',
   template: template,
   
   initialize: function() {
      this.model = Backbone.mediator.session;
      this.model.on('change', this.render, this);
      this.model.fetch();
   },
   
   getRenderData: function() {
      return {
         loggedIn: Backbone.mediator.session.get('loggedIn'),
         username: Backbone.mediator.session.get('username')
      };
   }
});