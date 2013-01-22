var application = require('application');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home',
    'about': 'about',
    'forum': 'forum',
    'pickup': 'pickup'
  },

  home: function() {
     application.navView.trigger('nav:home');
     $("#content").html(application.homeView.render().el);
  },
  
  about: function() {
     application.navView.trigger('nav:about');
     $("#content").html(application.aboutView.render().el);
  },
  
  pickup: function() {
     application.navView.trigger('nav:pickup');
     $('#content').html(application.pickupView.render().el);
  },
  
  fourm: function() {
     application.navView.trigger('nav:forum');
     $("#content").html(application.fourmView.render().el);
  }
});
