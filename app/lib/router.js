var application = require('application');
var User = require('../models/User');

module.exports = Backbone.Router.extend({
   routes: {
      '': 'home',
      'about': 'about',
      'forums': 'forums',
      'pickup': 'pickup',
      'forums/profile/:id' : 'profile'
   },

   home: function() {
      // application.navView.trigger('nav:home');
      $("#content").html(application.homeView.render().el);
   },

   about: function() {
      // application.navView.trigger('nav:about');
      $("#content").html(application.aboutView.render().el);
   },

   pickup: function() {
      // application.navView.trigger('nav:pickup');
      $('#content').html(application.pickupView.render().el);
   },

   forums: function() {
      // application.navView.trigger('nav:forum');
      $("#content").html(application.forumsView.render().el);
   },

   profile: function(id) {
      console.log(arguments);
      // application.navView.trigger('nav:forum');
      var user = new User();
      user.set('id', id);
      application.profileView.setModel(user);
      $("#content").html(application.profileView.render().el);
   }
});
