app.controller("authCtrl", function($scope, $firebaseAuth, $route) {
  
  $scope.authObj = $firebaseAuth();
  
  $scope.route = $route;
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
  //display the image and username
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      $scope.displayName = firebaseUser.displayName;
      $scope.profilePicUrl = firebaseUser.photoURL || 'images/profile_placeholder.png';
      $scope.email = firebaseUser.email;
      $scope.userPic = $('#user-pic');
      $scope.userPic.css('background-image', 'url(' + $scope.profilePicUrl + ')');
      console.log("Signed in as:", firebaseUser.displayName);
      $scope.route.reload();

    } else {
      $scope.firebaseUser = false;
      console.log("Signed out");
      $scope.userPic.css('background-image', 'url(/images/profile_placeholder.png)');

    }
  });

});
