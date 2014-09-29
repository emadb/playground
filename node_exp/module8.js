// export as a named prototype
var Foo = function () {};

Foo.prototype.log = function () {
  console.log('module 8');
};

exports.Foo = Foo;