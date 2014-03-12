
function ZERO(fun, x){
    return x;
}

function ONE(fun, x){
    return fun(x);
}

function TWO(fun, x){
    return fun(fun(x));
}

function THREE(fun, x){
    return fun(fun(fun(x)));
}

function FOUR(fun, x){
    return fun(fun(fun(fun(x))));
}

function FIVE(fun, x){
    return fun(fun(fun(fun(fun(x)))));
}

function SIX(fun, x){
    return fun(fun(fun(fun(fun(fun(x))))));
}

function SEVEN(fun, x){
    return fun(fun(fun(fun(fun(fun(fun(x)))))));
}

function EIGHT(fun, x){
    return fun(fun(fun(fun(fun(fun(fun(fun(x))))))));
}

function NINE(fun, x){
    return fun(fun(fun(fun(fun(fun(fun(fun(fun(x)))))))));
}

function TRUE(x){
    return function(y){ 
        return x;
    };
}

function FALSE(x){
    return function(y){
        return y;
    }
}

function IF(b){
    return function(x){
        return b(x)
    }
}
// n => { n(x => {return FALSE()})(TRUE)}
// IS_ZERO = -> n { n[-> x { FALSE }][TRUE] }

function IS_ZERO(n){
    var x = function(){return FALSE;}(TRUE);
    console.log(x()(TRUE));
    return n(x()(TRUE));
}

// Helpers
function toBoolean(fun){
  return IF(fun, true, false);
}

function toInteger(fun){
    return fun(function(n){ 
        return n + 1;
    }, 0);
}

// Numbers

// console.log(toInteger(ZERO));
// console.log(toInteger(ONE));
// console.log(toInteger(TWO));
// console.log(toInteger(THREE));
// console.log(toInteger(FOUR));
// console.log(toInteger(FIVE));
// console.log(toInteger(SIX));
// console.log(toInteger(SEVEN));
// console.log(toInteger(EIGHT));
// console.log(toInteger(NINE));


// Booleans
//console.log(toBoolean(TRUE));
//console.log(toBoolean(FALSE));

// IF
//console.log(toBoolean(IF(TRUE)(function(){return 'yes'})(function(){return 'no'}))());

// IS_ZERO 
console.log(toBoolean(IS_ZERO(ZERO)));



