module.exports = (function() {

    var Tokenizer = function() {
    
    };

    Tokenizer.prototype.parse = function(str) {
        var parts = str.split(/[_~|]+/);
        var results = [];
        
        if (parts.length > 3){
	        for(var i=0;i<parts.length-2;i+=3){
	        	var e = {T: parts[i], S1: parts[i+1], S2: parts[i+2]};
	        	results.push(e);
	    	}
    	}
		var t = {T: '', S1: parts[parts.length-2], S2: parts[parts.length-1]};
        results.push(t);
		
        return results;
    };

    return Tokenizer;
})();