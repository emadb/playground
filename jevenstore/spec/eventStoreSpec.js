var should = require("should"),
  assert = require("assert"),
  sinon = require("sinon"),
  EventStream = require("../lib/eventStream"),
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
    var eventStream = new EventStream();
    eventStream.addEvent({id:1, name:'event1'});
    eventStream.addEvent({id:2, name:'event2'});

    mock.expects("insert");

    eventStore.commit(eventStream);


    mock.verify();
  });
  
});
