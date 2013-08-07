"use strict";

var myApp = angular.module('TestAngular');

myApp.controller('ModalsController', ['$scope', '$http', function ($scope, $http) {
	
	$scope.sonoUnTitolo = "pre";
}]);


myApp.directive('modalShow', function() {
    return {
    	restrict: "A",
    	scope: {
    		sonoUnTitolo: '&'
    	},
    	link: function(scope, element, attrs) {
				angular.element(element).on('click', function(){
					scope.sonoUnTitolo = "Modal created";			
					console.log('scope', scope, scope.sonoUnTitolo);
					$('#' + attrs['modalShow']).modal();
				}
		);
	}
}
});