app.controller('evaluationResultsCtrl', ['$scope', 'firebaseService', '$location', function($scope, firebaseService, $location) {
    var user = firebase.auth().currentUser;
    var name, email;
    
    if (user != null) {//verify whether the user has logged in
      name = user.displayName;
      email = user.email;
    }else{
      alert("Please login!");
      $location.path("/");
    }
    
    
    $scope.tableShow =false;
    
     //get the answers object
    firebase.database().ref("Answers/Final_17spring").on('value', function(snapshot) {
        $scope.data = snapshot.val();
        // console.log(snapshot.val());
    });
    
    $scope.displayStudents = function (){
      $scope.groupData = $scope.data[$scope.teamSelected];
      // console.log($scope.groupData);
      var studentsArray = [];
      var evaluatorsArray = _.keys($scope.groupData);
      _.each($scope.groupData, function(peer) {
          studentsArray = studentsArray.concat(_.keys(peer));
      });//get all the students that have been evaluated
      $scope.students = _.uniq(studentsArray);//remove duplicates
      // console.log($scope.students);
      // console.log(evaluatorsArray);
      
      //seperate result
      var report = {};
      _.each($scope.students, function(student){
        // console.log($scope.groupData[student]);
        _.each(evaluatorsArray, function(peer){
            // console.log($scope.groupData[peer][student]);
            if (($scope.groupData[peer]).hasOwnProperty(student)){
              if (report.hasOwnProperty(student)){
                report[student][peer] = $scope.groupData[peer][student];
              } else {
                report[student] = {};
                report[student][peer] = $scope.groupData[peer][student];
              }
            }
          });
      });
      $scope.report = report;
      

      var subjects = _.keys(report);
      _.each(subjects, function(kid){
        var aggregate = {};
        var peers = _.keys(report[kid]);
        _.each(peers, function(peer){
          var questions = _.keys(report[kid][peer]);
          _.each(questions, function(question){
            if (aggregate.hasOwnProperty(question)){
              aggregate[question].push(report[kid][peer][question]);
            } else {
              aggregate[question] = [report[kid][peer][question]];
            }
          });
        });
        report[kid].results = aggregate;
      });
    };
    
    $scope.displayResults = function(){
      $scope.tableShow = true;
      $scope.results = $scope.report[$scope.studentName].results;
      $scope.peers = _.keys($scope.report[$scope.studentName]);
      $scope.peers.pop();
      // console.log($scope.results);
    };
    
    var getQuestionText = function(questionsArray){
      $scope.questions = [];
      for(var i = 0; i <= 13; i++){
        $scope.questions.push(questionsArray[i].questionText);
      }
      $scope.$apply();
    };
    
    firebase.database().ref("Quizzes/Quiz4/questions").once('value', function(snapshot) {
        var questionsArray = [];
        snapshot.forEach(function(record) {
            questionsArray.push(record.val());
        });
        getQuestionText(questionsArray);
    });
    
    
    
    
    
}]);