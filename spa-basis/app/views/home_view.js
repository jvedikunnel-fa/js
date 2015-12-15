// Contrôleur principal
// ====================

'use strict';

var View = require('./view');
var moment = require('moment');
var userName = require('lib/notifications').userName;


module.exports = View.extend({
  // Le template principal
  template: require('./templates/home'),
  getRenderData: function homeRenderData () {
    return {
      userName: userName,
      now: moment().format('dddd D MMMM YYYY HH:mm:ss')
    };
  },
  afterRender: function  homeAfterRender() {
    this.startClock();
  },
  startClock: function startClock() {
    var clock = this.$('#ticker');
    var that = this;
    setInterval(function() {
      clock.text(that.getRenderData().now);
    }, 1000);
    //setInterval(function() {
    //  clock.text(this.getRenderData().now);
    //}.bind(this), 1000); // compatible après IE9
  }
});
