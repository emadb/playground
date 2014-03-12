var should = require("should"),
	Tokenizer = require("../libs/tokenizer");
	

// Basket: 1Q|6_0~2° quarto|-_-~3° quarto|-_-~4° quarto|-_-~|6_0
// Calcio: |1_0

describe("Tokenizer", function() {
    beforeEach(function() {
        this.tokenizer = new Tokenizer();
	});

	it("|2_3 should return an array with 1 elements", function() {
		var result = this.tokenizer.parse("|2_3");
        
        result.length.should.be.equal(1);
        result[0].T.should.be.equal('');
        result[0].S1.should.be.equal('2');
        result[0].S2.should.be.equal('3');
	});

    it("1Q|6_0~2Q|8_2~3Q|8_10~4Q|-_-~|6_0 should return an array with 3 elements", function() {
        var result = this.tokenizer.parse("1Q|6_0~2Q|8_2~3Q|8_10~4Q|-_-~|8_10");
        
        result.length.should.be.equal(5);
        result[0].T.should.be.equal('1Q');
        result[0].S1.should.be.equal('6');
        result[0].S2.should.be.equal('0');

        result[1].T.should.be.equal('2Q');
        result[1].S1.should.be.equal('8');
        result[1].S2.should.be.equal('2');

        result[2].T.should.be.equal('3Q');
        result[2].S1.should.be.equal('8');
        result[2].S2.should.be.equal('10');

        result[3].T.should.be.equal('4Q');
        result[3].S1.should.be.equal('-');
        result[3].S2.should.be.equal('-');

        result[4].T.should.be.equal('');
        result[4].S1.should.be.equal('8');
        result[4].S2.should.be.equal('10');

    });

});
