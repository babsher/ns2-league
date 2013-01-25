var View = require('../view');
var template = require('./templates/main');

module.exports = View.extend({
   id: 'pickupApp-view',
   classes: 'container',
   template: template
});