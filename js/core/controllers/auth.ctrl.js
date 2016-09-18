app.controller("authCtrl",['$scope', '$firebaseAuth','$route',"$location", "$q",function($scope, $firebaseAuth, $route, $location, $q) {
  
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
  
   $scope.isEmailValid = function(email){
    var deferred = $q.defer();
    firebase.database().ref("Students/ELEG_267")
    .orderByChild("Email_Address")
    .startAt(email)
    .endAt(email)
    .once('value').then(function(snapshot) {
        if(snapshot.val()!== null){
          deferred.resolve(true);
        }else {
          firebase.database().ref("Students/ELEG_367")
            .orderByChild("Email_Address")
            .startAt(email)
            .endAt(email)
            .once('value').then(function(snapshot) {
                if(snapshot.val()!== null){
                  deferred.resolve(true);
                }else {
                  firebase.database().ref("Students/ELEG_467")
                  .orderByChild("Email_Address")
                  .startAt(email)
                  .endAt(email)
                  .once('value').then(function(snapshot) {
                      if(snapshot.val()!== null){
                        deferred.resolve(true);
                      }else {
                        deferred.reject(false);
                      }
                    });
                }
            });
        }
    });
    
    return deferred.promise;
  };
  

  // }
  //display the image and username
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      $scope.displayName = firebaseUser.displayName;
      $scope.profilePicUrl = firebaseUser.photoURL || 'images/profile_placeholder.png';
      $scope.email = firebaseUser.email;
      console.log($scope.email);
      
      $scope.isEmailValid($scope.email).then(function(res){
        //the email address is valid
          $location.path("/peer-evaluation");
        },function(res){
          //the email address is not valid
        $location.path("/invalid-login");
      });
      
      $scope.userPic = $('#user-pic');
      $scope.userPic.css('background-image', 'url(' + $scope.profilePicUrl + ')');
      console.log("Signed in as:", firebaseUser.displayName);
      $scope.route.reload();
    } else {
      $scope.firebaseUser = false;
      console.log("Signed out");
      $scope.userPic.css('background-image', 'url(/images/profile_placeholder.png)');
      $location.path("/");

    }
  });
  
 
  


}]);
