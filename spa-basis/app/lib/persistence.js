/**
 * Created by jvedikunnel on 15/12/2015.
 */

var CheckInsCollection = require('models/collection');
var Backbone = require('backbone');

var collection = new CheckInsCollection();
//console.log(collection);

function addCheckIn(checkIn) {
    checkIn.key = Date.now();
    collection.create(checkIn); // add + save
}

function initialLoad() {
    collection.fetch({reset: true}); // reset permet d'envoyer un event qu'on pourra écouter pour render la vue
}
initialLoad();

collection.on('reset', function(){
    Backbone.Mediator.publish('checkins:reset');
});

function getCheckIns() {
    return collection.toJSON();
}

exports.addCheckIn = addCheckIn;
exports.getCheckIns = getCheckIns;