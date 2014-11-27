var Rx = require('rx');


var source = Rx.Observable.timer(1000, 500)
    .take(30);

var subscription = source.subscribe(
    function (x) {
        console.log('Next: ' + x);
    },
    function (err) {
        console.log('Error: ' + err);
    },
    function () {
        console.log('Completed');
    });