var Controller = require('./base/controller');
var LoginView = require('../views/login_view');

module.exports = Controller.extend({
   initialize: function(){
      super();
      this.view = new LoginView();
   }
});