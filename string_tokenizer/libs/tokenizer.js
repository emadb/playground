module.exports = (function() {

    var Tokenizer = function() {
    
    };

    Tokenizer.prototype.parse = function(str) {
        var p1 = str.split('|');
        var p2 = p1[1].split('_');
        var result = {T: p1[0], S1: p2[0], S2: p2[1]};
        return [result];
    };

    return Tokenizer;
})();