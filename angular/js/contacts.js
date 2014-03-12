"use strict";

var myApp = angular.module('Contacts', []);
myApp.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'ContactsController',
		templateUrl: '/contacts.html'
	})
	.otherwise({
		redirectTo: '/'
	}); 
});

myApp.controller('ContactsController', ['$scope', '$http', function ($scope, $http) {
	$scope.title = "Contact list";
	$http.get("/contacts.json").success(function(data){
		$scope.contats = data;
	});
}]);
