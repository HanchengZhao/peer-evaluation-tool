var app = angular.module("advisorApp", ["firebase"]);

app.controller("authCtrl", function($scope, $firebaseAuth) {
  $scope.authObj = $firebaseAuth();

  // login with google
  $scope.authObj.$signInWithPopup("google").then(function(firebaseUser) {
    console.log("Signed in as:", firebaseUser.displayName);
  }).catch(function(error) {
    console.error("Authentication failed:", error);
  });
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
      $scope.profilePicUrl = firebaseUser.photoURL;
      $scope.email = firebaseUser.email;
      console.log($scope.profilePicUrl);
      // $("#user-pic").style.backgroundImage = 'url(' + $scope.profilePicUrl + ')';
      console.log("Signed in as:", firebaseUser.displayName);
    } else {
      $scope.firebaseUser = false;
      console.log("Signed out");
    }
  });



});