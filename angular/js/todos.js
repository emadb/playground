myApp.factory('Todos', function($resource) {
    return $resource('http://localhost:4567/todos', {});
});


myApp.controller('TodosController', ['$scope', '$http', 'Todos', function ($scope, $http, Todos) {
    
    Todos.query();

}]);