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
            },
            filter: {}
        });

    $scope.$watch('searchText', function(filter){
        var params = $scope.tableParams;
        
        // use build-in angular filter
        var filteredData = params.filter ? $filter('filter')(users, filter) : users;

        // set total for recalc pagination
        

        // slice array data on pages
        $scope.users = filteredData.slice(
            (params.page - 1) * params.count,
            params.page * params.count
        );

        //params.total = filteredData.length;
    
    }, true);

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
