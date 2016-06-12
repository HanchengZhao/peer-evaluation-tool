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
      //console.log($scope.profilePicUrl);
      // $("#user-pic").style.backgroundImage = 'url(' + $scope.profilePicUrl + ')';
      console.log("Signed in as:", firebaseUser.displayName);
    } else {
      $scope.firebaseUser = false;
      console.log("Signed out");
    }
  });

});//authCtrl

app.controller("questionCtrl", ["$scope", "$firebaseObject","$firebaseArray",
  function($scope, $firebaseObject, $firebaseArray) {
     
     $scope.types = ["Linear scale", "Multiple choice", "Paragragh", "Dropdown", "Check box"];
     $scope.low = "low";
     $scope.high = "high";
     
     var isLinearScale = function(){
       console.log($scope.selected);
       if ($scope.selected == "Linear scale") {
         return true;
       }else{
         return false;
       }
     };
     
     var ref = firebase.database().ref();

     var obj = $firebaseObject(ref);

     // to take an action after the data loads, use the $loaded() promise
     obj.$loaded().then(function() {
        console.log("loaded record:", obj.$id, obj.someOtherKeyInData);
       // To iterate the key/value pairs of the object, use angular.forEach()
       angular.forEach(obj, function(value, key) {
          console.log(key, value);
       });
     });
     
     var list = $firebaseArray(ref);

  }
]);