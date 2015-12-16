/**
 * Created by jvedikunnel on 16/12/2015.
 */
/* globals describe, before, beforeEach, afterEach, it */

var chai = require('chai');
var sinon = require('sinon');

describe('The persistence layer', function() {
    var store, clock;

    before(function() {
        chai.should();
    });     // Avant l'ensemble du `describe`

    beforeEach(function() {
        var Backbone = require('backbone');
        var cheerio = require('cheerio');
        Backbone.$ = cheerio.load('<body></body>'); // on pourrait utiliser ici Backbone.$ = require('jquery');
        Backbone.$.ajax = function(){};

        require('externals/backbone-mediator');
        store = require('lib/persistence');

        clock = sinon.useFakeTimers();
    }); // Avant chaque `it`

    afterEach(function() {
        clock.restore();
    });

    it('should guarantee a per ms unique key on checkins', function (){
        store.addCheckIn({name: 'Thai'});

        var checkIns = store.getCheckIns();
        checkIns.should.have.length(1, 'the checkin was not added');
        checkIns[0].should.contain.keys('name', 'key');
        var firstKey = checkIns[0].key;

        clock.tick(1000);

        store.addCheckIn({name: 'Mac Do'});

        checkIns = store.getCheckIns();
        checkIns.should.have.length(2, 'the checkin was not added');
        checkIns[0].should.contain.keys('name', 'key');
        checkIns[0].should.contain.property('key', firstKey+1000);
    });
});