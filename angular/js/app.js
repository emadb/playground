'use strict';

var myApp = angular.module('TestAngular', []);
myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/Home', {
            controller: 'MainController',
            templateUrl: 'index.html'
        })
        .otherwise({
            redirectTo: '/'
        }); 
    });

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


myApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.welcomeMessage = 'Hi guys';          
    $scope.updateMessage = function(){
        console.log('ci sono');
        $scope.welcomeMessage = 'The new message';
    };
    $scope.callAMethod = function(){
        console.log('inside controller');
        $http.get('/about.html').success(function(response){
            console.log('loaded', response);
        });
    };
}]);
