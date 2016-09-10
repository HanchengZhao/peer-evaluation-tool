app.controller('peerEvalCtrl', ['$scope', '$location','firebaseService',"$firebaseObject", "$firebaseArray", function($scope, $location, firebaseService, $firebaseObject, $firebaseArray ) {
     
     $scope.index = 0;
     $scope.process = 0;
     $scope.submitShow = false;
     
     //fetch all members' data
    firebase.database().ref("Students").on('value', function(snapshot) {
        var peerArray = [];
        var nameArray = [];
        snapshot.forEach(function(record) {
            peerArray.push(record.val()); // peerArray contains objects
        });
        peerArray.forEach(function(peer){
            nameArray.push(peer.Name); 
        })
        $scope.peers = nameArray;
    });
    
    firebase.database().ref("Quizzes/Quiz4/questions").once('value', function(snapshot) {
        var questionsArray = [];
        snapshot.forEach(function(record) {
            questionsArray.push(record.val());
        });
        $scope.questionsArray = questionsArray;
        display_questions($scope.index);
    });
    
     
      (function(){
        var ref = firebase.database().ref("Quizzes/Quiz4/questions");
      var questions = $firebaseArray(ref);
          for(var i in questions){
            //   console.log(i + ':' + questions[i]);
          }
      })();
      
    var display_questions = function(index){
    
    $scope.questionText = $scope.questionsArray[index].questionText;
    $scope.low = ($scope.questionsArray[index].options !==undefined) ? $scope.questionsArray[index].options.low : '';
    $scope.high = ($scope.questionsArray[index].options !==undefined) ? $scope.questionsArray[index].options.high : '';
    console.log($scope.questionText);
    
    }
    
    
    var adjustProcess =function(index, length){
        $scope.process = Math.floor((index / length) * 100) + '%';
    }
    
    
    $scope.previous = function(){
        
        $scope.index -= 1;
        display_questions($scope.index);
        $('#next-btn').prop('disabled', false);
        // $scope.submitShow = false;
        if($scope.index === 0){
            $('#previous-btn').prop('disabled', true);
        }
        adjustProcess($scope.index, 13);
        
    }
    
    
    $scope.next = function(){
        $scope.index += 1;
        display_questions($scope.index);
        $('#previous-btn').prop('disabled', false);
         if($scope.index >= 13){
            $('#next-btn').prop('disabled', true);
            $scope.submitShow = true;
        }
        adjustProcess($scope.index, 13);
    }
  
}]);
