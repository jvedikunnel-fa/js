/**
 * Created by jvedikunnel on 15/12/2015.
 */

var CheckInsCollection = require('models/collection');
var Backbone = require('backbone');
var cnxSvc = require('lib/connectivity');
var _ = require('underscore');

var collection = new CheckInsCollection();
//console.log(collection);

function addCheckIn(checkIn) {
    checkIn.key = Date.now();
    collection.create(checkIn); // add + save
}

var pendings;

function initialLoad() {
    if (!cnxSvc.isOnline()) {
        return;
    }

    pendings = collection.filter(function(m) {
        return m.isNew();
    });

    if (pendings.length) {
        collection.on('sync', accountForSync); // event sync envoyé par backbone quand envoyé au serveur
        _.invoke(pendings, 'save'); // exécute le save sur chaque élément de pendings
    } else {
        collection.fetch({reset: true}); // reset permet d'envoyer un event qu'on pourra écouter pour render la vue
    }
}

Backbone.Mediator.subscribe('connectivity:online', initialLoad);

function accountForSync(model) {
    // suppression de l'élément synchronisé par backbone
    pendings = _.without(pendings, model); // recharge les pendings sans l'élément synchronisé
    if (pendings.length) {
        return;
    }

    collection.off('sync', accountForSync); // suppression du listener pour ne pas refaire le fetch à caque sauvegarde suivante

    // il n'y en a plus : on fetch
    collection.fetch({reset: true});
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