module.exports = (function() {

  var EventStore = function(storage) {
    this.storage = storage;
    this.uncommittedEvents = [];
  };

  EventStore.prototype.addEvent = function(evt) {
    this.uncommittedEvents.push(evt);
  };

  EventStore.prototype.commit = function(){
    this.storage.commit();
  };

  return EventStore;

})();
