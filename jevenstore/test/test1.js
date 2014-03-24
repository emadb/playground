var should = require("should"),
	App1 = require("../app/app1");

describe("App1", function() {

	beforeEach(function() {

		this.player = new App1("testApp");

	});

	it("should return the name of the player", function() {

		this.player.getName().should.be.equal("testApp");

	});
});
