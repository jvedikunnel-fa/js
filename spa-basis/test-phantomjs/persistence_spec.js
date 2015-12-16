/**
 * Created by jvedikunnel on 16/12/2015.
 */
/* globals describe, before, beforeEach, afterEach, sinon, it */

var _ = require('underscore');

describe('The persistence layer', function() {
    var store, xhr;

    before(function() {
        var Backbone = require('backbone');
        var $ = require('jquery');
        Backbone.$ = $;
        require('backbone-mediator');
    });

    beforeEach(function() {
        localStorage.clear();
        xhr = sinon.fakeServer.create();
        store = require('lib/persistence');

        console.log(xhr.requests);
        _.chain(xhr.requests)
            .where({method: 'GET'})
            .each(function(req){ // pour chainer les méthodes et pas reboucler à chaque appel de la chaîne
              req.respond(200, {'Content-Type': 'application/json'}, '[]');
        });
    });

    afterEach(function() {
        xhr.restore();
    });

    it('should merge sync-based data in local cache', function(){
        var checkIn = {name: 'marché'};
        store.addCheckIn(checkIn);

        setTimeout(function(){

        }, 100);

        var req = _.findWhere(xhr.requests, {method: 'POST'});
        console.log(xhr.requests);
        req.respond(201, {'Content-Type': 'application/json'}, '{"id": 42}'); // attention, c'est du JSON donc id entre double quote

        store.getLocalStoreForTests(function(checkIns) {
            checkIns.should.have.length(1, 'The checkin was not added');
            checkIns[0].should.have.property('id', 42);
        });
    });
});
