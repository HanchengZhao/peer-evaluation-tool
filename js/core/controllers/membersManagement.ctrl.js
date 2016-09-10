app.controller('membersManagementCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    
    $scope.team = ['Grid Integrated-Vehicles','E-Textiles', 'Cloud Crypto']
    
    
    firebase.database().ref("Students").on('value', function(snapshot) {
       $scope.members = snapshot.val();
       console.log(snapshot.val());
  });
    
    $scope.addMemeberContent = false;
    $scope.addMemeber = function(){
    $scope.addMemeberContent = !$scope.addMemeberContent;
    setToDefault();
    };
    
    var setToDefault = function(){
        $scope.Name='';
        $scope.Email_Address='';
        $scope.ID='';
        $scope.Level='';
        $scope.Grade_Basis='';
        $scope.Program_and_Plan='';
        $scope.Units='';
    };
    
    $scope.saveMember = function(){
    var Name    = $scope.Name;
    var Email   = $scope.Email_Address;
    var ID     = $scope.ID;
    var Level       = $scope.Level;
    var Grade_Basis       = $scope.Grade_Basis;
    var Program_and_Plan   = $scope.Program_and_Plan;
    var Units       = $scope.Units;
    
    var newMember = {
       "Name": Name,
       "Email_Address": Email,
       "ID": ID,
       "Level": Level,
       "Grade_Basis": Grade_Basis,
       "Program_and_Plan": Program_and_Plan,
       "Units": Units
     };
     
     console.log(newMember);//debug
    var ref = '/Students/';
    
    firebaseService.pushDataWithUniqueID(ref, newMember);
    
    setToDefault();
  };
  
  $scope.deleteMember = function(team, unique_id) {
    console.log('/Students/'+  unique_id);//debug
      var memberRef = firebase.database().ref('/Students/'+  unique_id);
      memberRef.remove().then(function() {
          console.log("Remove succeeded.")
       })
       .catch(function(error) {
          console.log("Remove failed: " + error.message)
       });
   }

    
    
}]);