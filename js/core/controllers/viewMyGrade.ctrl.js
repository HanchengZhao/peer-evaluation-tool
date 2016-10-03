app.controller('viewMyGradeCtrl', ['$scope', 'firebaseService', '$location', function($scope, firebaseService, $location) {
    var user = firebase.auth().currentUser;
    var name, email;
    
    if (user != null) {//verify whether the user has logged in
      name = user.displayName;
      email = user.email;
    }else{
        $location.path("/");
    }
   
}]);