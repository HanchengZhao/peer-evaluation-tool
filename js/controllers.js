// CONTROLLERS
app.controller("authCtrl", function($scope, $firebaseAuth) {
  $scope.authObj = $firebaseAuth();
  //login with google
  $scope.signIn = function() {
      $scope.authObj.$signInWithPopup("google").then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.displayName);
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }
    
    //sign-out
  $scope.authObj.$signOut(function() {

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  })

  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      $scope.displayName = firebaseUser.displayName;
      $scope.profilePicUrl = firebaseUser.photoURL || 'images/profile_placeholder.png';
      $scope.email = firebaseUser.email;
      $scope.userPic = $('#user-pic');
      $scope.userPic.css('background-image', 'url(' + $scope.profilePicUrl + ')');
      console.log("Signed in as:", firebaseUser.displayName);

    } else {
      $scope.firebaseUser = false;
      console.log("Signed out");
      $scope.userPic.css('background-image', 'url(/images/profile_placeholder.png)');

    }
  });

});



app.controller('homeCtrl', ['$scope', '$location', function($scope, $location) {
    
}]);

app.controller('studentCtrl', ['$scope', function($scope) {
    
}]);