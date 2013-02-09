var CollectionView = require('./CollectionView');
var template = require('./templates/forums');
var ForumView = require('./forum_view');
var Forums = require('../models/Forums');


module.exports = CollectionView.extend({
   id: 'forums-view',
   template: template,
   itemView: ForumView,
   collection: new Forums(),
                             
   initialize: function(){
      this.collection.on('all', this.render, this);
      this.collection.fetch();
   }
});