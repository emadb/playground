var should = require("should"),
  assert = require("assert"),
  sinon = require("sinon"),
  EventStream = require("../lib/eventStream");

describe("EventStream", function() {

  var mock;
  beforeEach(function() {

    var storage = {commit: function(){}};
    mock = sinon.mock(storage);
    
    this.eventStream = new EventStream(storage);
  });

  // it("should persist a bunch of events", function() {

  //   mock.expects('commit');
  
  //   this.eventStream.addEvent({id:1, name:'event1'});
  //   this.eventStream.addEvent({id:2, name:'event2'});

  //   this.eventStream.commit();

  //   mock.verify();
  // });

  it('should be able to enumerate the event stream', function(){
    this.eventStream.addEvent({id:1, name:'event1'});
    this.eventStream.addEvent({id:2, name:'event2'});
    this.eventStream.addEvent({id:3, name:'event4'});
    this.eventStream.addEvent({id:4, name:'event5'});

    this.eventStream.pipe(function(evt){
      console.log(evt);
      assert.notEqual(undefined, evt.timestamp);
    });


  });

  it("should collect the event adding the timestamp ", function() {
    this.eventStream.addEvent({id:1, name:'event1'});
    this.eventStream.addEvent({id:2, name:'event2'});

    this.eventStream.getUncommitedEventSize().should.equal(2)
  });

  it("should call the callback with the event after addEvent", function() {

    var ev = {id:1, name:'event1'};

    this.eventStream.onAddEvent(function(evt){
      assert.equal(evt.id, ev.id);
    });

    this.eventStream.addEvent(ev);
  });

  
});
