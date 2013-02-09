var Collection = require('./collection');
var Forum = require('./Forum');

module.exports = Collection.extend({
   model: Thread,
   url: function() {
      return '/api/forums/' + this.forumId;
   }
});