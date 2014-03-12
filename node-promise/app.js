var Q = require('Q');

var fun1 = function(){
    var deferred = Q.defer();
    setTimeout(function(){
        deferred.resolve('eccomi');
    }, 3000);
    return deferred.promise;
};

var result = fun1();

console.log(result);

result.when(function(){
    console.log('ok');
})