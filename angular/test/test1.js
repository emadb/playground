describe('Testing a controller', function() {
   
    beforeEach(inject(function ($rootScope, $http, $controller, $location) {
        scope = $rootScope.$new();
        
        ctrlDependencies = {
            $scope: scope, 
            $http: $http,
        };
    
        var ctrl = $controller('ContactsController', ctrlDependencies);
    }));
    
    
    it('Replaces the element with the appropriate content', function() {
        expect('This is a test and it should work').toContain("test");
    });

});