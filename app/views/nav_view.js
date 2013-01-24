var View = require('./view');
var template = require('./templates/nav');
// var application = require('../application');

module.exports = View.extend({
   id: 'login-view',
   template: template,
   
   init: function(application) {
      application.router.on('route:home', function(){console.log(arguments); this.select('home')}, this);
      application.router.on('route:about', function(){this.select('about')}, this);
      application.router.on('route:pickup', function(){this.select('pickup')}, this);
      application.router.on('route:forum', function(){this.select('forum')}, this);
   },
   
   // Pages State machine
   current: 'home',
   pages: {
      home: false,
      about: false,
      pickup: false,
      forum: false
   },
   
   select: function(page) {
      this.pages[this.current] = false;
      this.pages[page] = true;
      this.current = page;
      console.log(this.pages);
      $('.navbar').html(this.render().el);
   },
   
   getRenderData: function() {
      return this.pages;
   }
});