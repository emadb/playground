"use strict";

var myApp = angular.module('TestAngular', ['ngResource']);

myApp.config(function ($routeProvider) {
	$routeProvider
	.when('/Main', {
		controller: 'MainController',
		templateUrl: '/main.html'
	})
	.when('/Contacts', {
          controller: 'ContactsController',
          templateUrl: "/contacts.html"
    })
	.otherwise({
		redirectTo: '/'
	}); 
});

var globalPhoneTypes = [
    { id: 0, type: 'None' },
    { id: 1, type: 'Mobile' },
    { id: 2, type: 'Fax' },
    { id: 3, type: 'Work' },
    { id: 4, type: 'Home' }
];


var getTypeDescription = function () {
    return function (value) {
		var result = _.find(globalPhoneTypes, function(item){ 
			return item.id === value;
		});
        return result.type;  
    };
};


myApp.filter("getTypeDescription", getTypeDescription);

myApp.directive("testd", function(){
	return {
		restrict: "C",
		templateUrl: "/about.html"
	};
});

myApp.directive("enter", function(){
	return function(scope, element, attrs){
		element.bind("mouseenter", function(){
			console.log(attrs);
			scope.$apply(attrs.enter);
		});
	}
});

/*
myApp.directive("leave", function(){
    return function(scope, element){
        element.bind("mouseleave", function(){
            console.log('Sono fuori');
        });
    }
});*/


myApp.factory('Contacts', function($resource) {
	return $resource('contacts.json', {});	
});



myApp.controller('MainController', ['$scope', function($scope){}]);

myApp.controller('ContactsController', ['$scope', '$http', 'Contacts', function ($scope, $http, Contacts) {
   
    $scope.phoneTypes = globalPhoneTypes;
    
    $scope.contacts = [];
    Contacts.query(function (data) {
        $scope.contacts = data;
        $scope.currentItem = data[0];
    });
    
    $scope.showDetails = function (item, $event) {
        $scope.currentItem = item;
        $event.preventDefault();
    };

    $scope.createNew = function() {
        var item = new Contact({ });
        $scope.contacts.push(item);
        $scope.currentItem = item;
    };

    $scope.save = function(item) {
        item.$save();
        console.log('save!');
    };

}]);