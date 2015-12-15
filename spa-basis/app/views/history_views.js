/**
 * Created by jvedikunnel on 15/12/2015.
 */

var View = require('./view');
var store = require('lib/persistence');

module.exports = View.extend({
    // Le template principal
    template: require('./templates/history'),
    checkinsTemplate: require('./templates/check_ins'),

    getRenderData: function homeRenderData () {
        return {
            list: this.renderTemplate({checkIns: store.getCheckIns()}, this.checkinsTemplate)
        };
    }
});
