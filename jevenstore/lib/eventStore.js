module.exports = (function() {
  var EventStore = function(driver) {
    this.driver = driver;
    this.events = [];
  };

  EventStore.prototype.collectEvent = function(stream){

    stream.pipe(function(evt){
      this.events.push({name: evt.name});
    });


  };

  EventStore.prototype.commit = function(){
    this.driver.commit({id:1, events: this.events});
  };
  
  return EventStore;

})();

