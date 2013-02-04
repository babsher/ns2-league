var View = require('./view');
var LoginView = require('./login_view');
var template = require('./templates/nav');

module.exports = View.extend({
   id: 'nav-view',
   template: template,
   login: new LoginView(),
   
   init: function(application) {
      application.router.on('route:home',   function(){this.select('home');}, this);
      application.router.on('route:about',  function(){this.select('about');}, this);
      application.router.on('route:pickup', function(){this.select('pickup');}, this);
      application.router.on('route:forums',  function(){this.select('forums');}, this);
      application.router.on('route:profile',  function(){this.select('profile');}, this);
      application.router.on('route', function(){console.log('route',arguments);});
   },
   
   // Pages State machine
   current: 'home',
   pages: {},
   
   select: function(page) {
      console.log(this.pages);
      this.pages[this.current] = false;
      this.pages[page] = true;
      this.current = page;
      $('.navbar').html(this.render().el);
   },
   
   getRenderData: function() {
      return this.pages;
   },
   
   afterRender: function(){
      this.assign( {
         '.login-view': this.login
      });
   }
});