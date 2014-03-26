var should = require("should"),
  assert = require("assert"),
  sinon = require("sinon"),
  EventStream = require("../lib/eventStream");

describe("EventStream", function() {

  var mock;
  var eventStream;

  beforeEach(function() {  
    eventStream = new EventStream();
  });

  it('should be able to enumerate the event stream', function(){
    eventStream.addEvent({id:1, name:'event1'});
    eventStream.addEvent({id:2, name:'event2'});
    eventStream.addEvent({id:3, name:'event4'});
    eventStream.addEvent({id:4, name:'event5'});

    eventStream.pipe(function(evt){
      console.log(evt);
      assert.notEqual(undefined, evt.timestamp);
    });


  });

  it("should collect the event adding the timestamp ", function() {
    eventStream.addEvent({id:1, name:'event1'});
    eventStream.addEvent({id:2, name:'event2'});

    eventStream.getUncommitedEventSize().should.equal(2)
  });

  it("should call the callback with the event after addEvent", function() {

    var ev = {id:1, name:'event1'};

    eventStream.onAddEvent(function(evt){
      assert.equal(evt.id, ev.id);
    });

    eventStream.addEvent(ev);
  });

  
});
