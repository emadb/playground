var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('yo', function(){console.log('yo', this);});

emitter.emit('yo');
