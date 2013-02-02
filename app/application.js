var Chaplin = require('chaplin');
var Layout = require('views/layout');
var routes = require('routes');

// Global Controllers
var NavigationController = require('./controller/navigation-controller');
var SessionController = require('./controllers/session-controller');

// Application bootstrapper.
module.exports = Chaplin.Application.extend({
   title: 'NS2-League',

   initialize: function() {
      Chaplin.Application.prototype.initialize.apply(this, arguments);
      this.initDispatcher();
      this.initLayout();
      this.initMediator();

      this.initControllers();
      this.initRouter(routes);

      if (typeof Object.freeze === 'function') Object.freeze(this);
   },

   initLayout: function() {
      // Use an application-specific Layout class. Currently this adds
      // no features to the standard Chaplin Layout, it’s an empty placeholder.
      this.layout = new Layout({title: this.title});
   },
   
   initControllers: function(){
      new NavigationController();
      new SessionController();
   },
   
   initMediator: function() {
      // Create a user property
      Chaplin.mediator.user = null;
      // Add additional application-specific properties and methods
      // Seal the mediator
      Chaplin.mediator.seal();
   }
};
