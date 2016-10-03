app.controller('advisorCtrl', ['$scope', 'firebaseService', '$location', function($scope, firebaseService, $location) {
    firebaseService.advisorCheck();
}]);