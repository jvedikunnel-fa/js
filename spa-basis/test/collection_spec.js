/**
 * Created by jvedikunnel on 16/12/2015.
 */
/* globals describe, before, beforeEach, it */

var chai = require('chai');

describe('The collection', function() {
    var collection;

    before(function() {
        chai.should();
    });     // Avant l'ensemble du `describe`

    beforeEach(function() {
        global.navigator = {};
        var Collection = require ('models/collection');
        collection = new Collection();
    }); // Avant chaque `it`

    // Et aussi : `after`, `afterEach`

    it('should maintain the natural order', function() {
        var oldCheckIn = {key: Date.now() - 10000};
        var recentCheckIn = {key: Date.now()};

        collection.add(oldCheckIn);
        collection.add(recentCheckIn);

        collection.at(0).toJSON().should.deep.equal(recentCheckIn);
        collection.at(1).toJSON().should.deep.equal(oldCheckIn);
    });
});
