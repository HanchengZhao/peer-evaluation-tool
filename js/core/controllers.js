// CONTROLLERS
app.controller("authCtrl", function($scope, $firebaseAuth, $route) {
  
  $scope.authObj = $firebaseAuth();
  
  $scope.route = $route;
  //login with google
  $scope.signIn = function() {
      $scope.authObj.$signInWithPopup("google").then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.displayName);
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    }
    
    //sign-out
  $scope.authObj.$signOut(function() {

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  })
  //display the image and username
  $scope.authObj.$onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
      $scope.firebaseUser = firebaseUser;
      $scope.displayName = firebaseUser.displayName;
      $scope.profilePicUrl = firebaseUser.photoURL || 'images/profile_placeholder.png';
      $scope.email = firebaseUser.email;
      $scope.userPic = $('#user-pic');
      $scope.userPic.css('background-image', 'url(' + $scope.profilePicUrl + ')');
      console.log("Signed in as:", firebaseUser.displayName);
      $scope.route.reload();

    } else {
      $scope.firebaseUser = false;
      console.log("Signed out");
      $scope.userPic.css('background-image', 'url(/images/profile_placeholder.png)');

    }
  });

});



app.controller('homeCtrl', ['$scope', '$location', function($scope, $location) {
    
}]);

app.controller('advisorCtrl', ['$scope', '$location','firebaseService', function($scope, $location, firebaseService) {
    
}]);

app.controller("questionsGenerateCtrl", ["$scope", "$firebaseObject", "$firebaseArray",'firebaseService',
 function($scope, $firebaseObject, $firebaseArray , firebaseService) {
   $scope.types = ["Linear scale", "Multiple choice", "Paragraph", "Dropdown", "Check box"];
   $scope.question = "Please describe question";
   
   //console.log the quizzes on any changes
  firebase.database().ref("Quizzes").on('value', function(snapshot) {
       var dataArray = [];;
       $scope.quizzes = snapshot.val();
       console.log(snapshot.val());
       snapshot.forEach(function(record) {
         dataArray.push(record.key);
       $scope.quizzesID = dataArray;
       });
  });
  
  $scope.addQuizContent = false;
  $scope.addQuiz = function(){
    $scope.addQuizContent = !$scope.addQuizContent;
  }
  
  $scope.saveQuiz = function(quizTitle,startDate,endDate){
    var quizArray = $scope.quizzesID;
    var length = quizArray.length + 1;
    var date = new Date();
    var newQuiz = {
       "quizTitle": quizTitle,
       "startDate": startDate,
       "endDate": endDate,
       "Created date" : date.toLocaleDateString()
     };
    var ref = '/Quizzes/' + "Quiz" + length;
    
    firebaseService.pushData(ref, newQuiz);
    
      $scope.quizTitle = "";
      $scope.startDate = "";
      $scope.endDate = "";
  };


   // Linear scale part
   $scope.low = "low";
   $scope.high = "high";
   $scope.saveLinearScale = function(question, low, high) {
     console.log(question);
     var linearScaleQuestion = {
       "questionText": question,
       "options":{"low":low, "high":high},
       "type": "LinearScale",
       "currentPostion": "?"
     };

    var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
    firebaseService.pushDataWithUniqueID(ref, linearScaleQuestion);
     this.question = "Please describe question";
   };

   // Paragraph part
   $scope.saveParagraph = function(question) {
     console.log(question);
     var paragraghQuestion = {
       "questionText": question,
       "type": "Paragraph",
       "currentPostion": "?"
     };
     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
     firebaseService.pushDataWithUniqueID(ref, paragraghQuestion);
     this.question = "Please describe question";
   };

   //Multiple choice
   $scope.multiOptions = ["option1"];

   $scope.addOption = function(array) {
     var len = array.length;
     len = len + 1;
     array.push("option" + len);
   }

   $scope.saveMultichoice = function(question) {
     console.log(question);
     var optionArray = $scope.multiOptions;
     var options={};
     optionArray.forEach(function(item, index) {
       options["option"+index]=item;
     }); 
     
     var multiOptionsQuestion = {
       "questionText": question,
       "options":options,
       "type": "MultipleChoices",
       "currentPostion": "?"
     }
    
    console.log(multiOptionsQuestion);
     //recover to original state
     this.question = "Please describe question";
     $scope.multiOptions = ["option1"];

     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
    firebaseService.pushDataWithUniqueID(ref, multiOptionsQuestion);
   };


   // Dropdown
   $scope.dropdowns = ["option1"];

   $scope.saveDropdown = function(question) {
     console.log(question);
     var optionArray = $scope.dropdowns;
     var options={};
     optionArray.forEach(function(item, index) {
       options["option"+index]=item;
     }); 
     var dropdownQuestion = {
       "questionText": question,
       "options":options,
       "type": "dropdown",
       "currentPostion": "?"
     };
     
     console.log(dropdownQuestion);
     this.question = "Please describe question";
     $scope.dropdowns = ["option1"];
     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
    firebaseService.pushDataWithUniqueID(ref, dropdownQuestion);
   };



   // Check box
   $scope.checkboxes = ["option1"];

   $scope.saveCheckbox = function(question) {
     console.log(question);
     var optionArray = $scope.checkboxes;
     var options={};
     optionArray.forEach(function(item, index) {
       options["option"+index]=item;
     }); 
     var checkboxQuestion = {
       "questionText": question,
       "options":options,
       "type": "checkbox",
       "currentPostion": "?"
     }

     //recover
     this.question = "Please describe question";
     $scope.checkboxes = ["option1"];
     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
    firebaseService.pushDataWithUniqueID(ref, checkboxQuestion);
   };
   
  // show questions
  var ref = firebase.database().ref();

   var obj = $firebaseObject(ref);

   var list = $firebaseArray(ref);

   $scope.filterQuestion = function(items) {
     var result = {};
     angular.forEach(items, function(value, key) {
       if (key == "question") {
         result[key] = value;
       }
     });
     return result;
   }

   $scope.filterOptions = function(items) {
     var result = {};
     angular.forEach(items, function(value, key) {
       if (key !== "question") {
         result[key] = value;
       }
     });
     return result;
   };

   $scope.deleteQuestion = function(unique_id) {
    console.log('Quizzes/'+ $scope.quizSelected +'/questions/' +  unique_id);
      var questionRef = firebase.database().ref('Quizzes/'+ $scope.quizSelected +'/questions/' +  unique_id);
      questionRef.remove().then(function() {
          console.log("Remove succeeded.")
       })
       .catch(function(error) {
          console.log("Remove failed: " + error.message)
       });
   }

   $scope.RetrieveData = function() {
       $scope.list = firebaseService.retrieveData("Questions-Data");
       console.log($scope.list);
   };
}]);


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


app.controller('studentCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    $scope.questionData = firebaseService.retrieveData("Questions-Data");
    console.log($scope.questionData);
}]);