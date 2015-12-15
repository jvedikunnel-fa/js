// Contrôleur principal
// ====================

'use strict';

var View = require('./view');
var userName = require('lib/notifications').userName;


module.exports = View.extend({
  // Le template principal
  template: require('./templates/home'),
  getRenderData: function homeRenderData () {
    return {
      userName: userName
    };
  }
});
