myApp.controller('NgTableController', ['$scope', '$http', '$filter', 'ngTableParams', function ($scope, $http, $filter, ngTableParams) {
    
    $scope.searchText = "";

    var users = $http.get('data.json').success(function(users){
        $scope.users = users;

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            total: users.length, // length of data
            count: 10,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        });

    $scope.$watch('tableParams', function(params) {
        // use build-in angular filter
        var orderedData = params.sorting ? 
                        $filter('orderBy')(users, params.orderBy()) :
                        users;
 
        // slice array data on pages
        $scope.users = orderedData.slice(
            (params.page - 1) * params.count,
            params.page * params.count
        );
    }, true);
    
    });

    
}]);
