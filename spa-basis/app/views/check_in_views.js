/**
 * Created by jvedikunnel on 15/12/2015.
 */
'use strict';

var View = require('./view');
var CheckInUX = require('models/check_in_ux');
var locSvc = require('lib/location');
var _ = require('underscore');
var poiSvc = require('lib/places');

module.exports = View.extend({
    // Le template principal
    template: require('./templates/check_in'),
    placesTemplate: require('./templates/places'),

    bindings: {
        '#geoloc': {
            observe: ['lat', 'lng'],
            onGet: function(pos) { // en param le contenu d'observe
                if (_.isString(pos[0]) || pos[0] === 0 && pos[1] === 0)
                    return "Je suis...";
                return pos[0] + " / " + pos[1];
            }
        },
        '#places': {
            observe: ['places'],
            onGet: function() {
                return this.renderTemplate(this.model.pick('places'), this.placesTemplate);
            },
            updateMethod: 'html'
        }
    },

    initialize: function() {
        // super
        View.prototype.initialize.apply(this, arguments);

        this.model = new CheckInUX();
    },

    afterRender: function afterCheckInRender() {
        this.fetchPlaces();
    },

    fetchPlaces: function fetchPlaces () {
        var that = this;
        locSvc.getCurrentLocation(function(lat, lng) {
            //console.log(lat, lng);
            that.model.set({
                lat: lat,
                lng: lng
            });
            //console.log(that.model);

            poiSvc.lookupPlaces(lat, lng, function(places) {
                //console.table(places);
                that.model.set('places', places);
            });
        });
    }
});
