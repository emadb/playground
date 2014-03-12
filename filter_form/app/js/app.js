window.app = angular.module('filtersApp', []);

window.app.controller('FilterController', ['$scope', '$http', function ($scope, $http) {
    $scope.fields = ['uno', 'due', 'tre'];
    $scope.currentField = 'due';
}]);

window.app.directive('filters',['$http', function($http) {

    function applyWatcher(scope, data, index){
        scope.$watch(['filters[', index, '].selectedField'].join(''), function(newValue, oldValue) {
            console.log('change', newValue);
            var selected = _.find(data, function(item){
                return item.name === newValue;
            });        
            if (selected !== undefined) {
                scope.values = selected.values;      
            }
        });
    }

    function bindFields(scope, data, index){
        scope.filters[index].fields = _.map( data, function(item){
            return item.name;
        }); 
    }

    return {
        restrict: 'E',
        templateUrl: 'filterTemplate.html',
        
        link: function(scope, elem, attrs) {
            var data;
            scope.filters = [
                {selectedField:'', selectedOperator:'', selectedValue:''}
                ];
            scope.operators = ['=', '!=', 'empty'];
            scope.selectedField = '';

            applyWatcher(scope, data, 0);

            scope.newLine = function(){
                scope.filters.push({selectedField:'', selectedOperator:'', selectedValue:''});
                applyWatcher(scope, data, scope.filters.length - 1);
                bindFields(scope, data, scope.filters.length - 1);
            };

            $http.get('/js/filterMetadata.js').then(function(meta){
                data = meta.data;
                bindFields(scope, data, 0);
            });
        }
    };
}]);
