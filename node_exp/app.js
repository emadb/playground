// var foo = require('./module3')
// foo();

// var mod = require('./module4')
// mod.foo();

// var mod = require('./module5')
// mod.foo();

// var mod = require('./module6').Foo
// mod.log();

// var Foo = require('./module7')
// var foo = new Foo();
// foo.log();

var Foo = require('./module8').Foo;
var foo = new Foo();
foo.log();