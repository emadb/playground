// export a named object
var Foo = function () {};

Foo.prototype.log = function () {
  console.log('module 6');
};

exports.Foo = new Foo();