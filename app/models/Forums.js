var Collection = require('./collection');
var Forum = require('./Forum');

module.exports = Collection.extend({
   model: Forum,
   url: '/api/forums'
});