// Application bootstrapper.
Application = {
   initialize: function() {
      var Session = require('models/Session');
      
      // Setup mediator
      var mediator = require('mediator');
      mediator.session = new Session();
      Backbone.mediator = mediator;
      
      // Views/Controllers
      var HomeView = require('views/home_view');
      var AboutView = require('views/about_view');
      var NavView = require('views/nav_view');
      var PickupView = require('views/pickup_view');
      var LoginView = require('views/login_view');
      var Router = require('lib/router');
      var ForumsView = require('views/forums_view');
      var ProfileView = require('views/profile_view');
      
      // Ideally, initialized classes should be kept in controllers & mediator.
      // If you're making big webapp, here's more sophisticated skeleton
      // https://github.com/paulmillr/brunch-with-chaplin
      this.homeView = new HomeView();
      this.profileView = new ProfileView();
      this.aboutView = new AboutView();
      this.pickupView = new PickupView();
      this.forumsView = new ForumsView();
      this.navView = new NavView();
      this.router = new Router();
      this.loginView = new LoginView();
      if (typeof Object.freeze === 'function') {Object.freeze(this);}
      this.navView.init(this);
  }
};

module.exports = Application;
