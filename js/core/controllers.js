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
   
   
  firebase.database().ref("Quizzes").on('value', function(snapshot) {
       var dataArray = [];
       var quizArray = [];
       var recordArray = [];
       snapshot.forEach(function(record) {
         dataArray.push(record.key);
         quizArray.push(record.val());
         recordArray.push(record);
         console.log("record.val():" +record.val());
         console.log("record:" +record);
         console.log("record.key:" +record.key);
       });
       $scope.quizzes = quizArray;
       $scope.quizzesID = dataArray;
       console.log($scope.quizzes);
       console.log("dataArray: " + dataArray);
       console.log("recordArray.key: " + recordArray.key);
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
     alert("Question saved");

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
     var multiOptionsQuestion = {
       "question": question,
       "options":{}
     }
    
     optionArray.forEach(function(item, index) {
       var options={};
       options["option"+index]=item;
       multiOptionsQuestion["options"]=options;
     })
    console.log(multiOptionsQuestion["options"]);
     //recover to original state
     this.question = "Please describe question";
     $scope.multiOptions = ["option1"];

     var newKey = firebase.database().ref().child('Quizzes/' + $scope.quizSelected).push().key;

     var updates = {};
     updates['/Quizzes/' +$scope.quizSelected+'/'+ newKey] = multiOptionsQuestion;

     return firebase.database().ref().update(updates);
   };


   // Dropdown
   $scope.dropdowns = ["option1"];

   $scope.saveDropdown = function(question) {
     console.log(question);
     var optionArray = $scope.dropdowns;
     var dropdownQuestion = {
       "question": question,
     }
     optionArray.forEach(function(item, index) {
       dropdownQuestion['option' + index] = item;
     })

     $scope.dropdowns = ["option1"];
     var newKey = firebase.database().ref().child('Questions-Data/Questions').child('Dropdown').push().key;

     var updates = {};
     updates['/Questions-Data/Questions/Dropdown/' + newKey] = dropdownQuestion;

     this.question = "Please describe question";
     return firebase.database().ref().update(updates);
   };



   // Check box
   $scope.checkboxes = ["option1"];

   $scope.saveCheckbox = function(question) {
     console.log(question);
     var optionArray = $scope.checkboxes;
     var checkboxQuestion = {
       "question": question,
     }
     optionArray.forEach(function(item, index) {
       checkboxQuestion['option' + index] = item;
     })

     //recover
     this.question = "Please describe question";
     $scope.checkboxes = ["option1"];
     alert('Question saved');
     var newKey = firebase.database().ref().child('Questions-Data/Questions').child('Checkbox').push().key;

     var updates = {};
     updates['/Questions-Data/Questions/Checkbox/' + newKey] = checkboxQuestion;

     return firebase.database().ref().update(updates);
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

   $scope.deleteQuestion = function(unique_id, questionType) {
     var questionRef = firebase.database().ref('Questions-Data/Questions/' + questionType + '/' + unique_id);
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

app.controller('studentCtrl', ['$scope', 'firebaseService', function($scope, firebaseService) {
    $scope.questionData = firebaseService.retrieveData("Questions-Data");
    console.log($scope.questionData);
}]);