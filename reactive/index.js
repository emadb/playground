var Rx = require('rx');
var array = [1,2,3,4,5];

// Converts an array to an observable sequence
var source = Rx.Observable.fromArray(array);

// Prints out each item
var subscription = source.subscribe(
    function (x) { console.log('onNext: ' + x); },
    function (e) { console.log('onError: ' + e.message); },
    function () { console.log('onCompleted'); });

// var source = Rx.Observable.timer(1000, 500)
//     .take(30);

// var subscription = source.subscribe(
//     function (x) {
//         console.log('Next: ' + x);
//     },
//     function (err) {
//         console.log('Error: ' + err);
//     },
//     function () {
//         console.log('Completed');
//     });