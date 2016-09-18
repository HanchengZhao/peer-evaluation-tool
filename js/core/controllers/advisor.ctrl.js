app.controller('advisorCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    var user = firebase.auth().currentUser;
    var name, email;
    
    if (user != null) {//verify whether the user has logged in
      name = user.displayName;
      email = user.email;
    }else{
        $location.path("/");
    }
   
}]);