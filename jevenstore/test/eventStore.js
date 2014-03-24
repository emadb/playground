var should = require("should"),
  sinon = require("sinon"),
  EventStore = require("../app/eventStore");

describe("EventStore", function() {


  beforeEach(function() {


  });

  it("should persist a bunch of events", function() {

    var mock;
    var storage = {commit: function(){}};

    mock = sinon.mock(storage);
    mock.expects('commit');

    this.eventStore = new EventStore(storage);


    this.eventStore.addEvent({id:1, name:'event1'});
    this.eventStore.addEvent({id:2, name:'event2'});

    this.eventStore.commit();

    mock.verify();
  });
});
