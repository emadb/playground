function Promise(fn) {  
  var state = 'pending';
  var value;
  var deferred;

  function resolve(newValue) {
    value = newValue;
    state = 'resolved';

    console.log('deferred?', deferred)
    if(deferred) {
      handle(deferred);
    }
  }

  function handle(onResolved) {
    if(state === 'pending') {
      deferred = onResolved;
      return;
    }

    onResolved(value);
  }

  this.then = function(onResolved) {
    handle(onResolved);
  };

  fn(resolve);
}

console.log('start')

// USE IT!
function doSomething() {  
  return new Promise(function(resolve) {
    var value = 42;
    resolve(value);
  })
  .then(function fun1(res) { console.log(res)})
  .then(function fun2(res) { console.log(res)})
  
}

doSomething()