var View = require('./view');
var template = require('./templates/pickup');
var PickupAppView = require('./pickup/pickupApp_view');

module.exports = View.extend({
   id: 'pickup-view',
   template: template,
   pickupAppView: new PickupAppView(),
   
   afterRender: function(){
      this.assign({
         '#pickup-app': this.pickupAppView
      });
   }
   
});