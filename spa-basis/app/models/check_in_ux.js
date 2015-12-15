/**
 * Created by jvedikunnel on 15/12/2015.
 */

// Modèle : CheckInUX
// ================

'use strict';

var Backbone = require('backbone');

// Bon, on n'a *rien* à rajouter aux capacités inhérentes
// de Backbone.Model, mais c'est toujours mieux de prévoir un
// module par modèle et par collection, donc voilà.

module.exports = Backbone.Model.extend({
    defaults: {
        lat: 0,
        lng: 0,
        places: [],
        comment: '',
        placeId: undefined,
        checkInForbidden: true
    },
    initialize: function initCheckInUX() {
        var that = this;
        //super
        Backbone.Model.prototype.initialize.apply(this, arguments);

        // on change
        this.on('change', checkCheckinable);

        checkCheckinable();

        function checkCheckinable () {
            that.set('checkInForbidden', that.get('placeId') === undefined);
        }
    }
});
