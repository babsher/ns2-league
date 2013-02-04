// User Profile View
var View = require('./view');
var LoginView = require('./login_view');
var template = require('./templates/profile');

module.exports = View.extend({
   id: 'nav-view',
   template: template
});