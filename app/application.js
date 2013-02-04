// Application bootstrapper.
Application = {
   initialize: function() {
      var HomeView = require('views/home_view');
      var AboutView = require('views/about_view');
      var NavView = require('views/nav_view');
      var PickupView = require('views/pickup_view');
      var LoginView = require('views/login_view');
      var Router = require('lib/router');
      var User = require('models/User');
      
      // Ideally, initialized classes should be kept in controllers & mediator.
      // If you're making big webapp, here's more sophisticated skeleton
      // https://github.com/paulmillr/brunch-with-chaplin
      Backbone.user = new User();
      this.homeView = new HomeView({model: new User()});
      this.aboutView = new AboutView();
      this.pickupView = new PickupView();
      this.navView = new NavView();
      this.router = new Router();
      this.loginView = new LoginView();
      if (typeof Object.freeze === 'function') {Object.freeze(this);}
      this.navView.init(this);

      Backbone.user.fetch();
  }
};

module.exports = Application;
