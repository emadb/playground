window.app = angular.module('filtersApp', []);

window.app.controller('FilterController', ['$scope', '$http', function ($scope, $http) {
    $scope.fields = ['uno', 'due', 'tre'];
    $scope.currentField = 'due';
    $scope.submit = function(filters){
        console.log('controller submit', filters);
    };
}]);

window.app.directive('filters',['$http', function($http) {

    function applyWatcher(scope, data, index){
        scope.$watch(['filters[', index, '].selectedField'].join(''), function(newValue, oldValue) {
            
            var selected = _.find(data, function(item){
                return item.name === newValue;
            });
            if (selected !== undefined) {
                if (angular.isArray(selected.values)){
                    scope.filters[index].values = selected.values;
                }
                else{
                    $http.get(selected.values).then(function(values){
                        scope.filters[index].values = values.data;
                    });
                    
                }
            }
        });
    }

    function bindFields(scope, data, index){
        scope.filters[index].fields = _.map( data, function(item){
            return item.name;
        });
    }

    function getFilterElement(){
        return {
            selectedField:'', 
            selectedOperator:'', 
            selectedValue:'',
            operators : ['=', '!=', '>', '<'],
            fields: [],
            values: []
        };
    }

    return {
        restrict: 'E',
        templateUrl: 'filterTemplate.html',
        scope: {
            submitFn: "&"
        },
        link: function(scope, elem, attrs) {
            var data;
            var submitFn = attrs.submitFn;
            var filterMetadata = attrs.metaData;
            scope.filters = [getFilterElement()];

            scope.newLine = function(){
                scope.filters.push(getFilterElement());
                applyWatcher(scope, data, scope.filters.length - 1);
                bindFields(scope, data, scope.filters.length - 1);
            };

            scope.removeLine = function(index){
                scope.filters.splice(index, 1);
            };

            scope.applyFilter = function(){
                var filters = _.map(scope.filters, function(filter){
                    return {field: filter.selectedField, operator: filter.selectedOperator, value: filter.selectedValue};
                });
                scope.submitFn({filters: filters});
            };

            scope.saveFilter = function(){
                var filters = _.map(scope.filters, function(filter){
                    return {field: filter.selectedField, operator: filter.selectedOperator, value: filter.selectedValue};
                });
                console.log('saveFilter', filters);
            };

            $http.get(filterMetadata).then(function(meta){
                data = meta.data;
                bindFields(scope, data, 0);
                applyWatcher(scope, data, 0);
            });
        }
    };
}]);
