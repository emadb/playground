var should = require("should"),
  assert = require("assert"),
  sinon = require("sinon"),
  EventStore = require("../lib/eventStore");

describe("EventStore", function() {

  var mock;
  var driver;
  var eventStore;

  beforeEach(function() {

    driver = {commit: function(){}};
    mock = sinon.mock(driver);
    
    eventStore = new EventStore(driver);
  });

  it("should persist a bunch of events", function() {

    var events = [{id:1, name:'event1'},{id:2, name:'event2'},{id:3, name:'event3'}];
    var i = 0;
    var eventStream = {pipe: function(){}};

    var stub = sinon.stub(eventStream, 'pipe', function (){
      var evt = events[i];
      i++;
      return evt ;
    });

    mock.expects('commit').withArgs(
      {id: 1, 
        events: [{name:'event1'},{name:'event2'},{name:'event3'}]
      });

    eventStore.collectEvent(eventStream);
    eventStore.commit();

    mock.verify();
  });
  
});
