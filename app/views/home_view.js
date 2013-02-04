var View = require('./view');
var template = require('./templates/home');

module.exports = View.extend({
   id: 'home-view',
   classes: 'container',
   template: template
});