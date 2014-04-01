window.app = angular.module('filtersApp', []);

window.app.controller('FilterController', ['$scope', '$http', function ($scope, $http) {
    $scope.fields = ['uno', 'due', 'tre'];
    $scope.currentField = 'due';
    $scope.submit = function(filters){
        console.log('controller submit', filters);
    };
}]);

/*

    { $and: [
        { qty: { $gt: 100 } },
        { price: { $lt: 9.95 } }
        ]
    }

    db.TipologieDocumento.find({Nome: "TestVale4dicembre_bis", _id: "4"})
    db.TipologieDocumento.find({Nome: {$ne: "TestVale4dicembre_bis"}})

*/


window.app.directive('filters',['$http', function($http) {

    var eq = {label: 'equal', operator: 'eq'};
    var ne = {label: 'not equal', operator: '$ne'};
    var gt = {label: 'greater than', operator: '$gt'};
    var lt = {label: 'less than', operator: '$lt'};
    var empty = {label: 'empty', operator: 'null'};
    var nempty = {label: 'not empty', operator: 'nnull'};
    var contains = {label: 'contains', operator: 'contains'};
    var ncontains = {label: 'not contains', operator: 'ncontains'};
    
    var optionsOperators = [eq, ne];
    var textOperators = [eq, ne];

    function applyWatcher(scope, data, index){
        scope.$watch(['filters[', index, '].selectedField'].join(''), function(newValue, oldValue) {
            
            var selected = _.find(data, function(item){
                return item.label === newValue;
            });
    
            if (selected !== undefined) {
                switch(selected.type){
                    case 'options':
                        scope.filters[index].values = selected.values;
                        scope.filters[index].operators = optionsOperators;
                        break;
                    case 'remote-options':
                        $http.get(selected.values).then(function(values){
                            scope.filters[index].values = values.data;
                        });
                        scope.filters[index].operators = optionsOperators;
                        break;
                    case 'text':
                    scope.filters[index].operators = textOperators;
                        break;
                }
            }
        });
    }

    function bindFields(scope, data, index){
        scope.filters[index].fields = _.map( data, function(item){
            return {label: item.label, type: item.type, value: item.values};
        });
    }

    function getFilterElement(){
        return {
            selectedField:'', 
            selectedOperator:'', 
            selectedValue:'',
            operators : [],
            fields: [],
            values: []
        };
    }

    function getMongoQuery(filter){
        if (filter.operator === eq.operator){
            return ['{', filter.field, ':\"', filter.value, '\"}'].join('');
        }

        if (filter.operator === ne.operator){
            return ['{', filter.field, ': {$ne: \"', filter.value, '\"}}'].join('');
        }
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

                var query = '{ $and: [';
                _.forEach(filters, function(filter){
                    var q = getMongoQuery(filter);
                    query = query + q + ',';
                 });
                query = query.slice(0, -1) + ']}';
                scope.submitFn({query: query});
            };

            scope.saveFilter = function(){
                var filters = _.map(scope.filters, function(filter){
                    return {field: filter.selectedField, operator: filter.selectedOperator, value: filter.selectedValue};
                });
                console.log('saveFilter', filters);
            };

            scope.hasOptions = function(selectedField, index) {
                var field = _.find(scope.filters[index].fields, function(field){ return field.label === selectedField; });
                return field !== undefined && field.type === 'options';
            };

            $http.get(filterMetadata).then(function(meta){
                data = meta.data;
                bindFields(scope, data, 0);
                applyWatcher(scope, data, 0);
            });
        }
    };
}]);
