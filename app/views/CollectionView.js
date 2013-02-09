var View = require('./view');

module.exports = View.extend({
   render: function(){
      View.prototype.render.apply(this, arguments);
      var items = this.collection.models;
      for(var i = 0; i < items.length; i++) {
         var subView = new this.itemView({model: items[i]});
         this.$el.append(subView.render().el);
      }
      return this;
   }
});