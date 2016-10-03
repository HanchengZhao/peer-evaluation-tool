app.controller('homeCtrl', ['$scope', '$location', 'firebaseService', function($scope, $location,firebaseService) {
    
    $scope.authCheck = function(){
        var user = firebase.auth().currentUser;
        if (user != null) {//verify whether the user has logged in
        var email = user.email;
        }else{
            alert("Please login!");
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
                  console.log(snapshot.val());
              }else{
                  alert("Sorry, you do not have permission!");
              }
            });
        }else{
            alert("Please login!");
        }
        
       
    }
}]);