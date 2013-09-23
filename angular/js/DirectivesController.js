"use strict";

var myApp = angular.module('TestAngular');

myApp.controller('DirectivesController', ['$scope', function ($scope) {
	$scope.collection = [{name: 'uno', cc:{value: 10}}, {name:'due', cc:{value: 11}}];
	
}]);

myApp.directive('itemHeader', [function() {
    return {
        restrict: 'A',
        scope: {
            name: "=",
			cc: "="
        },
        link: function(scope, elem, attrs) {
            console.log('dir', scope.name, scope.cc);
        }
    };
}]);
