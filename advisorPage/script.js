var app = angular.module("advisorApp", ["firebase"]);

app.controller("authCtrl", function($scope, $firebaseAuth) {
//   var auth = $firebaseAuth();
  $scope.authObj = $firebaseAuth();
    // Sign in Firebase using popup auth and Google as the identity provider.
    //   var provider = new firebase.auth.GoogleAuthProvider();
    //   this.auth.signInWithPopup(provider);

  // login with google
  $scope.authObj.$signInWithPopup("google").then(function(firebaseUser) {
  console.log("Signed in as:", firebaseUser.uid);
}).catch(function(error) {
  console.error("Authentication failed:", error);
  
  
//   logout
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
  if (firebaseUser) {
    console.log("Signed in as:", firebaseUser.uid);
  } else {
    console.log("Signed out");
  }
});
  //$scope.logout
});
});