"use strict";

var myApp = angular.module('TestAngular');

myApp.controller('ModalsController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	
	$scope.openModal = function(id){
		console.log('opening');
		if (id == 'new') {
          $scope.userBeingEdited = null;
        }
        else {
          $scope.userBeingEdited = id;
        }
        $rootScope.$broadcast('user:edit', {username: 'pippo'});
	};

    $rootScope.$on('user:save', function(scope, data) {
        console.log('saved', data.username);
        $scope.username = data.username;
    });
	
}]);


myApp.controller('MyModalController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$rootScope.$on('user:edit', function(d, data) {
		
		$scope.username = data.username;
        $scope.save = function(){
            $rootScope.$broadcast('user:save', {username: $scope.username});   
        };
	});	
}]);
