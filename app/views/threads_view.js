var CollectionView = require('./CollectionView');
var template = require('./templates/threads');
var ThreadItemView = require('./threadItem_view');
var Threads = require('../models/Threads');

module.exports = CollectionView.extend({
   template: template,
   itemView: ThreadItemView,
   collection: new Threads({forumId: this.options.forumId}),
   
   initialize: function(){
      this.collection.on('change', this.render, this);
      this.collection.fetch();
   }
});