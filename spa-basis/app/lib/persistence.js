/**
 * Created by jvedikunnel on 15/12/2015.
 */

var CheckInsCollection = require('models/collection');

var collection = new CheckInsCollection();
//console.log(collection);

function addCheckIn(checkIn) {
    collection.create(checkIn); // add + save
}

function initialLoad() {
    collection.fetch();
}
initialLoad();

function getCheckIns() {
    return collection.toJSON();
}

exports.addCheckIn = addCheckIn;
exports.getCheckIns = getCheckIns;