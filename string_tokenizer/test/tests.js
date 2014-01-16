var should = require("should"),
	Tokenizer = require("../libs/tokenizer");
	

// Basket: 1Q|6_0~2° quarto|-_-~3° quarto|-_-~4° quarto|-_-~|6_0
// Calcio: |1_0

describe("Tokenizer", function() {
    beforeEach(function() {
        this.tokenizer = new Tokenizer();
	});

	it("1Q|2_3 should return an array with 1 elements", function() {
		var result = this.tokenizer.parse("1Q|2_3");
        var expeceted = [{T: 'Q1', S1: 2, S2: 3}];
        result.length.should.be.equal(1);
        result[0].T.should.be.equal('Q1');
        result[0].S1.should.be.equal(2);
        result[0].S2.should.be.equal(3);
	});
});
