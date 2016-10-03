app.controller('homeCtrl', ['$scope', '$location', 'firebaseService', function($scope, $location,firebaseService) {
    
    $scope.authCheck = function(){
        var user = firebase.auth().currentUser;
        var name, email;
        
        if (user != null) {//verify whether the user has logged in
            name = user.displayName;
            email = user.email;
        }else{
            
            alert("Please login!");
        }
    };
}]);