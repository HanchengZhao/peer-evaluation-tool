app.controller('peerEvalCtrl', ['$scope', '$location','firebaseService',"$firebaseObject", "$firebaseArray","$q", "$route",function($scope, $location, firebaseService, $firebaseObject, $firebaseArray, $q, $route) {
     
     $scope.index = 0;
     $scope.process = 0;
     $scope.submitShow = false;
     $scope.user;
     $scope.scale = true;
     $scope.bonus = false;
     $scope.comment = false;
     $scope.answers = {
         
     };
     
    var user = firebase.auth().currentUser;
    var name, email;
    
    if (user != null) {//verify whether the user has logged in
      name = user.displayName;
      email = user.email;
    }else{
        $location.path("/");
    }
    
    $scope.getClassInfo = function(email){
    var deferred = $q.defer();
    firebase.database().ref("Students/ELEG_267")
    .orderByChild("Email_Address")
    .startAt(email)
    .endAt(email)
    .once('value').then(function(snapshot) {
        if(snapshot.val()!== null){
            //get the user's name
            snapshot.forEach(function(record){
                $scope.username = record.val().Name;
            })
          deferred.resolve('ELEG_267');
        }else {
          firebase.database().ref("Students/ELEG_367")
            .orderByChild("Email_Address")
            .startAt(email)
            .endAt(email)
            .once('value').then(function(snapshot) {
                if(snapshot.val()!== null){
                    //get the user's name
                    snapshot.forEach(function(record){
                        $scope.username = record.val().Name;
                    })
                    
                  deferred.resolve('ELEG_367');
                }else {
                  firebase.database().ref("Students/ELEG_467")
                  .orderByChild("Email_Address")
                  .startAt(email)
                  .endAt(email)
                  .once('value').then(function(snapshot) {
                      if(snapshot.val()!== null){
                        //get the user's name
                        snapshot.forEach(function(record){
                            $scope.username = record.val().Name;
                        })
                        deferred.resolve('ELEG_467');
                      }else {
                        deferred.reject(false);
                      }
                    });
                }
            });
        }
    });
    // console.log(deferred.promise);
    return deferred.promise;
  };
  
   $scope.getClassInfo(email).then(function(res){
       //the email address is valid
        //   console.log("promise:" + res);
          $scope.class = res;
          fetchPeersName($scope.class);
         
        },function(res){
          console.log("error" + res);
      });;
    
     //fetch all members' data
     var fetchPeersName = function(Class){
        firebase.database().ref("Students/" + Class).once('value', function(snapshot) {
            var peerArray = [];
            var nameArray = [];
            snapshot.forEach(function(record) {
                peerArray.push(record.val()); // peerArray contains objects
            });
            peerArray.forEach(function(peer){
                nameArray.push(peer.Name); 
            })
            
            var index = nameArray.indexOf($scope.username);
            nameArray.splice(index,1);//get rid of user's name
            
            $scope.peers = nameArray;
            // console.log($scope.peers);
            $scope.$apply();//let angular know the change
        
        });
     }
    
    $scope.radiovalue = function(answers){
        console.log(answers);
    }
    
     var display_questions = function(index){
    
    $scope.questionText = $scope.questionsArray[index].questionText;
    $scope.low = ($scope.questionsArray[index].options !==undefined) ? $scope.questionsArray[index].options.low : '';
    $scope.high = ($scope.questionsArray[index].options !==undefined) ? $scope.questionsArray[index].options.high : '';
    // console.log($scope.questionText);
    
    }
    
    firebase.database().ref("Quizzes/Quiz4/questions").once('value', function(snapshot) {
        var questionsArray = [];
        snapshot.forEach(function(record) {
            questionsArray.push(record.val());
        });
        $scope.questionsArray = questionsArray;
        console.log($scope.questionsArray);
        display_questions($scope.index);
    });
    
    
     
    var adjustProcess =function(index, length){
        $scope.process = Math.floor((index / length) * 100) + '%';
    }
    
    
    $scope.previous = function(){
        
        $scope.index -= 1;
        display_questions($scope.index);
        $('#next-btn').prop('disabled', false);
        // $scope.submitShow = false;
        if($scope.index === 12 ){
            $scope.scale = false;
            $scope.bonus = true;
            $scope.comment = false;
        }else if($scope.index === 13){
            $scope.scale = false;
            $scope.bonus = false;
            $scope.comment = true;
        }else{
            $scope.scale = true;
            $scope.bonus = false;
            $scope.comment = false;
        }
        
        if($scope.index === 0){
            $('#previous-btn').prop('disabled', true);
        }else{
            $("html, body").animate({ scrollTop: 0 }, "fast"); // scoll to the top of the page
        }
        adjustProcess($scope.index, 13);
        
    }
    
    $scope.next = function(){
        $scope.index += 1;
        display_questions($scope.index);
        $('#previous-btn').prop('disabled', false);
        $("html, body").animate({ scrollTop: 0 }, "fast");
        if($scope.index === 12 ){
            $scope.scale = false;
            $scope.bonus = true;
            $scope.comment = false;
        }else if($scope.index === 13){
            $scope.scale = false;
            $scope.bonus = false;
            $scope.comment = true;
        }else{
            $scope.scale = true;
            $scope.bonus = false;
            $scope.comment = false;
        }
         if($scope.index >= 13){
            $('#next-btn').prop('disabled', true);
            $scope.submitShow = true;
            
        }
        adjustProcess($scope.index, 13);
        
    }
    $scope.lastQuestion = function(){
        $scope.index = 13
        $scope.scale = false;
        $scope.bonus = false;
        $scope.comment = true;
        $('#previous-btn').prop('disabled', false);
        $('#next-btn').prop('disabled', true);
        $scope.submitShow = true;
        adjustProcess($scope.index, 13);
    }
    
    $scope.submit = function(){
        var ref = "Answers/" + $scope.class + "/" + $scope.username;
        firebaseService.pushData(ref,$scope.answers);
    }
    
    
    
}]);
