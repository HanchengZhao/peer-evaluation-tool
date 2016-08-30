app.controller('studentCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    $scope.questionData = firebaseService.retrieveData("Questions-Data");
    console.log($scope.questionData);
}]);