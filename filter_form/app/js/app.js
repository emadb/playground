window.app = angular.module('filtersApp', []);

window.app.controller('FilterController', ['$scope', '$http', function ($scope, $http) {
    $scope.fields = ['uno', 'due', 'tre'];
    $scope.currentField = 'due';
}]);

window.app.directive('filters',['$http', function($http) {
    return {
        restrict: 'E',
        templateUrl: 'filterTemplate.html',
        link: function(scope, elem, attrs) {
            var data;
            scope.operators = ['=', '!=', 'empty'];
            scope.selectedField = '';

            scope.$watch('selectedField', function(newValue, oldValue) {
                var selected = _.find(data, function(item){
                    return item.name === newValue;
                })        
                if (selected !== undefined) {
                    scope.values = selected.values;      
                }
            });

            $http.get('/js/filterMetadata.js').then(function(meta){
                data = meta.data;
                scope.fields = _.map( data, function(item){
                    return item.name;
                });
            });
        }
    };
}]);
