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


/*
[
    { "label": "Nome", "field": "Nome", "type": "text" },
    { "label": "Sincronizzato", "field": "SyncConsulenteAbilitato", "values": [true, false], "type": "options" },
    { "label": "Data creazione", "field": "DataCreazione",  "type": "text" },
    { "label": "Foo", "values": "/url-per-caricare/i-valori/Foo", "type": "remote-options" },
    { "label": "Bar", "field": "Number", "values": [1, 2, 10, 40], "type": "options" },
    { "label": "Baz", "field": "Number", "type": "text" }
]
*/

window.app.directive('filters', ['$http', '$location', function ($http, $location) {

    var eq = { label: 'equal', operator: 'eq' };
    var ne = { label: 'not equal', operator: '$ne' };
    var gt = { label: 'greater than', operator: '$gt' };
    var lt = { label: 'less than', operator: '$lt' };
    var empty = { label: 'empty', operator: 'null' };
    var nempty = { label: 'not empty', operator: 'nnull' };
    var contains = { label: 'contains', operator: 'contains' };
    var ncontains = { label: 'not contains', operator: 'ncontains' };

    var optionsOperators = [eq, ne];
    var textOperators = [eq, ne];

    function applyWatcher(scope, data, index) {
        scope.$watch(['filters[', index, '].selectedField'].join(''), function (newValue, oldValue) {

            var selected = _.find(data, function (item) {
                return item.field === newValue;
            });

            if (selected !== undefined) {
                switch (selected.type) {
                    case 'options':
                        scope.filters[index].values = selected.values;
                        scope.filters[index].operators = optionsOperators;
                        break;
                    case 'remote-options':
                        $http.get(selected.values).then(function (values) {
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

    function bindFields(scope, data, index) {
        scope.filters[index].fields = _.map(data, function (item) {
            return { label: item.label, type: item.type, value: item.values, field: item.field };
        });
    }

    function getFilterElement() {
        return {
            selectedField: '',
            selectedOperator: '',
            selectedValue: '',
            operators: [],
            fields: [],
            values: []
        };
    }

    function getMongoQuery(filter) {
        var obj = {};
        if (filter.operator === eq.operator) {
            obj[filter.field] = filter.value;
        }

        if (filter.operator === ne.operator) {
            obj[filter.field] = { "$ne": filter.valueOf };
        }

        return obj;
    }

    function saveFilter(path, filters) {
        $http.post(['/filters?path=', path].join(''), filters).success(function() {
            console.log('saved');
        });
    }

    return {
        restrict: 'E',
        templateUrl: '/views/templates/filterTemplate.html',
        scope: {
            submitFn: "&"
        },
        link: function (scope, elem, attrs) {
            var data;
            var submitFn = attrs.submitFn;
            var filterMetadata = attrs.metaData;
            scope.filters = [getFilterElement()];

            scope.newLine = function () {
                scope.filters.push(getFilterElement());
                applyWatcher(scope, data, scope.filters.length - 1);
                bindFields(scope, data, scope.filters.length - 1);
            };

            scope.removeLine = function (index) {
                scope.filters.splice(index, 1);
            };

            scope.applyFilter = function () {
                var filters = _.map(scope.filters, function (filter) {
                    return { field: filter.selectedField, operator: filter.selectedOperator, value: filter.selectedValue };
                });

                var query = {};
                query.$and = [];
                _.forEach(filters, function (filter) {
                    query.$and.push(getMongoQuery(filter));
                });
                scope.submitFn({ query: query });
            };

            scope.saveFilter = function () {
                var filters = _.map(scope.filters, function (filter) {
                    return { field: filter.selectedField, operator: filter.selectedOperator, value: filter.selectedValue };
                });
                saveFilter($location.path(), filters);
            };

            scope.hasOptions = function (selectedField, index) {
                var field = _.find(scope.filters[index].fields, function (field) { return field.field === selectedField; });
                return field !== undefined && field.type === 'options';
            };

            $http.get(filterMetadata).then(function (meta) {
                data = meta.data;
                bindFields(scope, data, 0);
                applyWatcher(scope, data, 0);
            });
        }
    };
}]);
