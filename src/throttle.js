Function.prototype.throttle = function(interv) {
    var f = this;
    var lastTime = 0;

    return function() {
        if (Date.now() - lastTime < interv) {
            return;
        }

        lastTime = Date.now();
        return f.apply(this, arguments);
    };
};

// Protocole de test

function sayHi() { console.log(Date.now(), "Hiiiii…"); }

console.log(Date.now());
var hiCoquine = setInterval(sayHi.throttle(1000), 100);

setTimeout(function() { clearInterval(hiCoquine); }, 10000);