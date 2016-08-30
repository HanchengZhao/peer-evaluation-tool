app.controller('membersManagementCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    
    $scope.team = ['Grid Integrated-Vehicles','E-Textiles', 'Cloud Crypto']
    
    
    firebase.database().ref("Members").on('value', function(snapshot) {
       $scope.members = snapshot.val();
       console.log(snapshot.val());
  });
    
    $scope.addMemeberContent = false;
    $scope.addMemeber = function(){
    $scope.addMemeberContent = !$scope.addMemeberContent;
    setToDefault();
    };
    
    var setToDefault = function(){
        $scope.Lastname='';
        $scope.Firstname='';
        $scope.Credits='';
        $scope.Class='';
        $scope.Major='';
        $scope.Semesters='';
        $scope.Email='';
        $scope.teamSelected = 'Team';
    };
    
    $scope.saveMember = function(){
    var Lastname = $scope.Lastname;
    var Firstname = $scope.Firstname;
    var Credits = $scope.Credits;
    var Class = $scope.Class;
    var Major = $scope.Major;
    var Semesters = $scope.Semesters;
    var Email = $scope.Email;
    var Team = $scope.teamSelected;
    
    var newMember = {
       "lastname": Lastname,
       "firstname": Firstname,
       "credits": Credits,
       "class": Class,
       "major": Major,
       "semesters": Semesters,
       "email": Email,
       "team": Team
     };
     
     console.log(newMember);//debug
    var ref = '/Members/';
    
    firebaseService.pushDataWithUniqueID(ref, newMember);
    
    setToDefault();
  };
  
  $scope.deleteMember = function(team, unique_id) {
    console.log('Members/'+  unique_id);//debug
      var memberRef = firebase.database().ref('Members/'+  unique_id);
      memberRef.remove().then(function() {
          console.log("Remove succeeded.")
       })
       .catch(function(error) {
          console.log("Remove failed: " + error.message)
       });
   }

    
    
}]);