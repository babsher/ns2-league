var View = require('./view');
var LoginView = require('./login_view');
var template = require('./templates/nav');

module.exports = View.extend({
   id: 'nav-view',
   template: template,
   login: new LoginView(),
   
   init: function(application) {
      application.router.on('route:home',   function(){this.select('home')}, this);
      application.router.on('route:about',  function(){this.select('about')}, this);
      application.router.on('route:pickup', function(){this.select('pickup')}, this);
      application.router.on('route:forum',  function(){this.select('forum')}, this);
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