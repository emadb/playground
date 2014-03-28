var _ = require('lodash');

module.exports = (function() {
  var EventStore = function(driver) {
    this.driver = driver;
    this.events = [];
  };

  EventStore.prototype.collectEvent = function(stream){
    var self = this;
    stream.pipe(function(evt){
      console.log('pipe', evt);
      self.events.push({name: evt.name});
    });


  };

  EventStore.prototype.commit = function(args){
    this.driver.insert({id:1, events: this.events});
  };
  
  return EventStore;

})();

