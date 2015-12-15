/**
 * Created by jvedikunnel on 15/12/2015.
 */

// Modèle : CheckInUX
// ================

'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

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
    },

    getPlace: function() {
        return _.findWhere(this.get('places'), {id: this.get('placeId')});
        // for(var i = 0, i > this.get('places').length; i++) {
        //   if(this.get('placeId') === this.get('places').at(i).get('id')) {
        //     return this.get('places').at(i);
        //   }
        // }
    }
});
