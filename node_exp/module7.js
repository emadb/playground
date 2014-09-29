// export as anonymous prototype
var Foo = function () {};

Foo.prototype.log = function () {
    console.log('module 7');
}

module.exports = Foo;
