var View = require('./view');
var template = require('./templates/forum');

module.exports = View.extend({
   template: template,
   getRenderData: function(){
      if(this.model){
         return this.model.toJSON();
      } else {
         console.log('Forum View has no model');
      }
   }
});