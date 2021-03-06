app.controller("authCtrl",['$scope', '$firebaseAuth','$route',"$location", "$q",function($scope, $firebaseAuth, $route, $location, $q) {
  
  $scope.authObj = $firebaseAuth();
  
  $scope.route = $route;
  //login with google
  $scope.signIn = function() {
      $scope.authObj.$signInWithPopup("google").then(function(firebaseUser) {
        // console.log("Signed in as:", firebaseUser.displayName);
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
    
     firebase.database().ref("Advisors")
        .orderByChild("email")
        .startAt(email)
        .endAt(email)
        .once('value').then(function(snapshot){
          if(snapshot.val()!== null){
              deferred.resolve('advisor');
        }else{
        firebase.database().ref("Students/17spring/ARTGINEERING")
        .orderByChild("Email_Address")
        .startAt(email)
        .endAt(email)
        .once('value').then(function(snapshot) {
            if(snapshot.val()!== null){
              deferred.resolve('student');
            }else {
              firebase.database().ref("Students/17spring/CLOUD_CRYPTO")
                .orderByChild("Email_Address")
                .startAt(email)
                .endAt(email)
                .once('value').then(function(snapshot) {
                    if(snapshot.val()!== null){
                      deferred.resolve('student');
                    }else {
                      firebase.database().ref("Students/17spring/E-TEXTILES")
                      .orderByChild("Email_Address")
                      .startAt(email)
                      .endAt(email)
                      .once('value').then(function(snapshot) {
                          if(snapshot.val()!== null){
                            deferred.resolve('student');
                          }else {
                            firebase.database().ref("Students/17spring/GRID-INTEGRATED_VEHICLES")
                              .orderByChild("Email_Address")
                              .startAt(email)
                              .endAt(email)
                              .once('value').then(function(snapshot) {
                                  if(snapshot.val()!== null){
                                    deferred.resolve('student');
                                  }else {
                                    firebase.database().ref("Students/17spring/HIGH-PERFORM_COMPUTING")
                                      .orderByChild("Email_Address")
                                      .startAt(email)
                                      .endAt(email)
                                      .once('value').then(function(snapshot) {
                                          if(snapshot.val()!== null){
                                            deferred.resolve('student');
                                          }else {
                                            deferred.reject(false);
                                          }
                                        });
                                  }//HIGH-PERFORM_COMPUTING
                                });
                            }//GRID-INTEGRATED_VEHICLES
                        });
                    }//E-TEXTTILES
                });
            }//CLOUD_CRYPTO
        });
        }//ARTGINEERING
      });
    
    return deferred.promise;
  };
  

  // }
  //display the image and username
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    $scope.userPic = $('#user-pic');
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      $scope.displayName = firebaseUser.displayName;
      $scope.profilePicUrl = firebaseUser.photoURL || 'images/profile_placeholder.png';
      $scope.email = firebaseUser.email;
      // console.log($scope.email);
      
      $scope.isEmailValid($scope.email).then(function(res){
        //the email address is valid
         if(res === "advisor"){
           $location.path("/advisor-page");
         }else if(res === "student"){
          $location.path("/peer-evaluation");
         }
        },function(res){
          //the email address is not valid
        $location.path("/invalid-login");
      });

      $scope.userPic.css('background-image', 'url(' + $scope.profilePicUrl + ')');
      // console.log("Signed in as:", firebaseUser.displayName);
      $scope.route.reload();
    } else {
      $scope.firebaseUser = false;
      console.log("Signed out");
      $scope.userPic.css('background-image', 'url(images/profile_placeholder.png)');
      $location.path("/");

    }
  });
  
 
  


}]);
