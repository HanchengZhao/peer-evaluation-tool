app.controller('peerEvalCtrl', ['$scope', '$location','firebaseService', function($scope, $location, firebaseService) {
     //fetch all members' data
    firebase.database().ref("Members").on('value', function(snapshot) {
        var peerArray = [];
        var nameArray = [];
        snapshot.forEach(function(record) {
            peerArray.push(record.val()); // peerArray contains objects
        });
        peerArray.forEach(function(peer){
            nameArray.push(peer.firstname + ' '+ peer.lastname); 
        })
        console.log(nameArray);
        $scope.peers = nameArray;
    });
    
  firebase.database().ref("Quizzes/Quiz1/questions").on('value', function(snapshot) {
       var dataArray = [];
       $scope.questions = snapshot.val();
       console.log(snapshot.val());
  });
}]);
