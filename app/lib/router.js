var application = require('application');
var User = require('../models/User');

module.exports = Backbone.Router.extend({
   routes: {
      '': 'home',
      'about': 'about',
      'forums': 'forums',
      'pickup': 'pickup',
      'forums/profile/:id' : 'profile',
      'forums/:forumId' : 'forum'
   },

   home: function() {
      $("#content").html(application.homeView.render().el);
   },

   about: function() {
      $("#content").html(application.aboutView.render().el);
   },

   pickup: function() {
      $('#content').html(application.pickupView.render().el);
   },

   forums: function() {
      $("#content").html(application.forumsView.render().el);
   },
   
   forum: function(forumId) {
      threadsView.options.forumId = forumId;
      $("#content").html(application.threadsView.render().el);
   },

   profile: function(id) {
      var user = new User();
      user.set('id', id);
      application.profileView.setModel(user);
      $("#content").html(application.profileView.render().el);
   }
});
