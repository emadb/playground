var _ = require('lodash');
module.exports = (function() {

  var EventStream = function(storage) {
    this.storage = storage;
    this.uncommittedEvents = [];
    this.onAddEventCallbacks = [];
  };

  EventStream.prototype.addEvent = function(evt) {
    evt.timestamp = Date.now();
    this.uncommittedEvents.push(evt);
    _.forEach(this.onAddEventCallbacks, function (cb){
      cb(evt);
    });
  };

  EventStream.prototype.getUncommitedEventSize = function(){
    return this.uncommittedEvents.length;
    
  };

  // EventStream.prototype.commit = function(){
  //   this.storage.commit();
  // };

  EventStream.prototype.pipe = function(callback){
    _.forEach(this.uncommittedEvents, function(evt){
      callback(evt);
    });
  };

  EventStream.prototype.onAddEvent = function(callback){
    this.onAddEventCallbacks.push(callback);
  };

  return EventStream;

})();

