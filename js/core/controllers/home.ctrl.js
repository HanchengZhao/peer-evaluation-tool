app.controller('homeCtrl', ['$scope', '$location', 'firebaseService', '$timeout', function($scope, $location,firebaseService,$timeout) {
    
    $scope.noPemission = false;
    $scope.notLogin = false;
    
    $scope.authCheck = function(){
        var user = firebase.auth().currentUser;
        if (user != null) {//verify whether the user has logged in
        var email = user.email;
        $location.path("/student-page");
        }else{
            $scope.notLogin = true;
        }
    };
    
    $scope.advisorCheck =function(){
        var user = firebase.auth().currentUser;
        if (user != null) {//verify whether the user has logged in
            var email = user.email;
            firebase.database().ref("Advisors")
            .orderByChild("email")
            .startAt(email)
            .endAt(email)
            .once('value').then(function(snapshot){
              if(snapshot.val()!== null){
                  $timeout(function () { // solve the problem of delay
                    $location.path("/advisor-page");
                    }, 0);
              }else{
                  $scope.noPemission = true;
              }
            });
        }else{
            $scope.noPemission = true;
        }
        
       
    }
}]);