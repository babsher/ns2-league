require('lib/view_helper');

// Base class for all views.
var object = Backbone.View.extend({
   initialize: function() {
     this.render = _.bind(this.render, this);
   },

   template: function() {},
   getRenderData: function() {},
 
   render: function() {
      this.beforeRender();
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
   },

   afterRender: function() {},
   beforeRender: function() {},

   // http://ianstormtaylor.com/assigning-backbone-subviews-made-even-cleaner/
   assign : function (selector, view) {
      var selectors;
      if (_.isObject(selector)) {
         selectors = selector;
      } else {
         selectors = {};
         selectors[selector] = view;
      }
      if (!selectors) { return; }
      
      _.each(selectors, function (view, selector) {
            if(view) {
               view.setElement(this.$(selector)).render();
            } else {
               console.log("View is undefined for selector " + selector);
            }
         }, this);
   }
});

module.exports = _.extend(object, Backbone.Events);
