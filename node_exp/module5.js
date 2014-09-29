// export as anonnymous object
var foo = function () {};

foo.prototype.foo = function () {
  console.log('module 5');
};

module.exports = new foo();