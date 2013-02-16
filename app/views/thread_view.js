var CollectionView = require('./CollectionView');
var template = require('./templates/threads');
var PostView = require('./post_view');
var Posts = require('../models/Posts');

module.exports = CollectionView.extend({
   template: template,
   itemView: PostView,
   collection: new Posts({forumId: this.options.forumId}),
   
   initialize: function(){
      this.collection.on('change', this.render, this);
      this.collection.fetch();
   }
});