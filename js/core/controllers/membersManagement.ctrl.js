app.controller('membersManagementCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    
    var user = firebase.auth().currentUser;
    var name, email;
    
    if (user != null) {//verify whether the user has logged in
      name = user.displayName;
      email = user.email;
    }else{
        $location.path("/");
    }
    
    // $scope.team = ['ELEG_267','ELEG_367', 'ELEG_467']
    $scope.teamSelected;
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
    var Class       = $scope.teamSelected;
 
    
    var newMember = {
       "Name": Name,
       "Email_Address": Email,
       "ID": ID,
       "Level": Level,
       "Grade_Basis": Grade_Basis,
       "Program_and_Plan": Program_and_Plan,
       "Units": Units,
       "Class": Class
     };
     
     console.log(newMember);//debug
    var ref = '/Students/'+$scope.teamSelected;
    // var ref2 = '/Students/All_Members';
    
    firebaseService.pushDataWithUniqueID(ref, newMember);
    // firebaseService.pushDataWithUniqueID(ref2, newMember);
    
    setToDefault();
  };
  
  $scope.deleteMember = function(team, unique_id) {
    console.log('/Students/'+  unique_id);//debug
      var memberRef = firebase.database().ref('/Students/'+ $scope.teamSelected +"/" +unique_id);
      memberRef.remove().then(function() {
          console.log("Remove succeeded.")
       })
       .catch(function(error) {
          console.log("Remove failed: " + error.message)
       });
   }

    
    
}]);