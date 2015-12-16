/**
 * Created by jvedikunnel on 16/12/2015.
 */
/* globals describe, before, beforeEach, afterEach, sinon, it */

describe('The home view', function() {
    var prompt, io, xhr, clock;
    var homeView;

    before(function() {
        var Backbone = require('backbone');
        var $ = require('jquery');
        Backbone.$ = $;
        require('backbone-mediator');
        require('moment').lang('fr');
    });

    beforeEach(function() {
        xhr = sinon.fakeServer.create();
        prompt = sinon.stub(window, 'prompt').returns('Jo');
        io = sinon.stub(require('socket.io'), 'connect').returns(
            {on : function(){}}
        );
        clock = sinon.useFakeTimers(1450280749836);
        var HomeView = require('views/home_view'); // require de brunch car app.js dans le html
        homeView = (new HomeView()).render();
    });

    afterEach(function() {
        xhr.restore();
        prompt.restore();
        io.restore();
        clock.restore();
    });

    it('should render the clock at startup', function() {
        homeView.$('#ticker').text().should.equal("mercredi 16 décembre 2015 16:45:49");
    });

    it('should render the clock every second', function() {
        clock.tick(1001); // car le startClock() est déclenché dans le afterRender qui laisse un tick d'horloge la 1ère fois
        homeView.$('#ticker').text().should.equal("mercredi 16 décembre 2015 16:45:50");

        clock.tick(1000);
        homeView.$('#ticker').text().should.equal("mercredi 16 décembre 2015 16:45:51");
    });
});
