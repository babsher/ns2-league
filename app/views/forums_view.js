var View = require('./view');
var template = require('./templates/forums');
var ForumView = require('./forum_view');
var Forums = require('../models/Forums');


module.exports = View.extend({
   id: 'forums-view',
   template: template,
   itemView: ForumView,
   collection: new Forums(),
                             
   initialize: function(){
      if(!this.collection){
         this.collection = new Forums();
      }
      this.collection.on('change', this.render, this);
      this.collection.fetch();
   },
   
   render: function(){
      View.prototype.render.apply(this, arguments);
      var items = this.collection.models;
      console.log('Found items', items);
      for(var i = 0; i < items.length; i++){
         var subView = new this.itemView({model: items[i]});
         this.$el.append(subView.render().el);
      }
      return this;
   }
});