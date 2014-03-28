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

    driver = {insert: function(){}};
    mock = sinon.mock(driver);
    eventStore = new EventStore(driver);

  });
  
  it("fake", function() {
    var obj = {add: function(a,b){return a+b;}};
    var mock = sinon.mock(obj);

    mock.expects('add');

    obj.add(1,3);

    mock.verify();
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
