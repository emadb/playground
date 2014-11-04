function MyObject(options){
  this.fun = options.fun;
}

MyObject.prototype.doSomething = function() {
  this.fun();
};

var functions ={fun: function (){console.log('Original function')}};

var myObj = new MyObject(functions)

functions.fun = function (){console.log('new function')}

myObj.doSomething();