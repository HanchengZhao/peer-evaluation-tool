app.controller('evaluationResultsCtrl', ['$scope', 'firebaseService', '$location', function($scope, firebaseService, $location) {
    var user = firebase.auth().currentUser;
    var name, email;
    
    if (user != null) {//verify whether the user has logged in
      name = user.displayName;
      email = user.email;
    }else{
        $location.path("/");
    }
    
     //get the answers object
    firebase.database().ref("Answers").on('value', function(snapshot) {
        $scope.data = snapshot.val();
        console.log(snapshot.val());
    });

    $scope.teamSelected = "ELEG_367";
    $scope.groupData = $scope.data[$scope.teamSelected];
    $scope.students = _.keys($scope.groupData);
    console.log($scope.students);
    
    //seperate result
    var report = {};
    _.each($scope.students, function(student){
      _.each(_.keys($scope.groupData[student]), function(peer){
            console.log($scope.groupData[student][peer]);
            if (report.hasOwnProperty(peer)){
              report[peer][student] = $scope.groupData[student][peer];
            } else {
              report[peer] = {};
              report[peer][student] = $scope.groupData[student][peer];
            }
        });
    });
    
    console.log(report["Betters,Mark Nathan"]);
    
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
    
    console.log(report["Betters,Mark Nathan"].results);
    
    
    
}]);