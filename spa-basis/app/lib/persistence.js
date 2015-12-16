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

collection.on('reset', function(){
    Backbone.Mediator.publish('checkins:reset');
});

collection.on('add', function(model){ // vue dans l'api backbone ce que renvoie le add
    Backbone.Mediator.publish('checkins:new', model.toJSON());
});

initialLoad();

function getCheckIns() {
    return collection.toJSON();
}

exports.addCheckIn = addCheckIn;
exports.getCheckIns = getCheckIns;