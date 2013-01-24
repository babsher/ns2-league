// Application bootstrapper.
Application = {
  initialize: function() {
    var HomeView = require('views/home_view');
    var AboutView = require('views/about_view');
    var NavView = require('views/nav_view');
    var PickupView = require('views/pickup_view');
    var Router = require('lib/router');
    var User = require('models/User');
    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin
    Backbone.user = new User();
    this.homeView = new HomeView();
    this.aboutView = new AboutView();
    this.pickupView = new PickupView();
    this.navView = new NavView();
    this.router = new Router();
    if (typeof Object.freeze === 'function') Object.freeze(this);
    this.navView.init(this);
    this.router.on('all', function(){console.log(arguments)});
  }
}

module.exports = Application;
