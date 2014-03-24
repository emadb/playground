module.exports = (function() {

	var App1 = function(name) {

		this.name = name;

	};

	App1.prototype.getName = function() {

		return this.name;

	};

  return App1;

})();
