// User Profile View
var View = require('./view');
var LoginView = require('./login_view');
var template = require('./templates/profile');

module.exports = View.extend({
   id: 'nav-view',
   template: template,
   editable: false,
   
   setModel: function(model) {
      // TODO deregister previous event listeners
      this.model = model;
      this.model.on('change', this.render, this);
      this.model.fetch();
   },
   
   beforeRender: function() {
      this.editable = this.model.get('id') === Backbone.mediator.session.get('steamid');
   },
   
   getRenderData: function(){
      var data = this.model.toJSON();
      data.editable = this.editable;
      return data;
   }
});