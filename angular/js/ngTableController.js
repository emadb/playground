myApp.controller('NgTableController', ['$scope', '$http', '$filter', 'ngTableParams', function ($scope, $http, $filter, ngTableParams) {
    
    $scope.searchText = "";

    $scope.showDetails = function(){
        console.log('hello from click');
    }

    var users = $http.get('data.json').success(function(users){
        $scope.users = users;

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            total: users.length, // length of data
            count: 10,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            },
            filter: {},
            filtering: 1
        });

        $scope.$watch('searchText', function(filter){

            $scope.tableParams.filtering = $scope.tableParams.filtering+1;
            // var params = $scope.tableParams;
            
            // // use build-in angular filter
            // var filteredData = params.filter ? $filter('filter')(users, filter) : users;

            // // slice array data on pages
            // $scope.users = filteredData.slice(
            //     (params.page - 1) * params.count,
            //     params.page * params.count
            // );

            // params.total = filteredData.length;

        
        }, true);

        $scope.$watch('tableParams', function(params) {
            
            var filteredData = users;

            if ($scope.searchText.length > 0){
                filteredData = params.filter ? $filter('filter')(users, $scope.searchText) : users;
            }
            // use build-in angular filter
            var orderedData = params.sorting ? $filter('orderBy')(filteredData, params.orderBy()) : users;
     
            // slice array data on pages
            $scope.users = orderedData.slice(
                (params.page - 1) * params.count,
                params.page * params.count
            );
        }, true);
        
    });

    
}]);
