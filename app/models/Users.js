var Collection = require('./collection');
var User = require('./User');

module.exports = Collection.extend({
   model: User,
   url: '/api/users'
});