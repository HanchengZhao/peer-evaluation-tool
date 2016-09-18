app.controller("questionsGenerateCtrl", ["$scope", "$firebaseObject", "$firebaseArray","firebaseService",
 function($scope, $firebaseObject, $firebaseArray , firebaseService) {
   
   var user = firebase.auth().currentUser;
    if (user != null) {//verify whether the user has logged in
    }else{
        $location.path("/");
    }
   
   
   
   
   $scope.types = ["Linear scale", "Multiple choice", "Paragraph", "Dropdown", "Check box"];
   $scope.question = "Please describe question";
   
   //console.log the quizzes on any changes
  firebase.database().ref("Quizzes").on('value', function(snapshot) {
       var dataArray = [];
       $scope.quizzes = snapshot.val();
       console.log(snapshot.val());
       snapshot.forEach(function(record) {
         dataArray.push(record.key);
       });
       $scope.quizzesID = dataArray;
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
  
  
//save question
var countChildren = function (ref) {
    var count;
   firebase.database().ref(ref).once('value', function(snapshot) {
       count =  snapshot.numChildren();
  });
   return count;
}

   // Linear scale part
   $scope.low = "low";
   $scope.high = "high";
   $scope.saveLinearScale = function(question, low, high) {
     console.log(question);
     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
     var position = countChildren(ref) + 1;
     var linearScaleQuestion = {
       "questionText": question,
       "options":{"low":low, "high":high},
       "type": "LinearScale",
       "currentPosition": position
     };

    
    firebaseService.pushDataWithUniqueID(ref, linearScaleQuestion);
     this.question = "Please describe question";
   };

   // Paragraph part
   $scope.saveParagraph = function(question) {
     console.log(question);
     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
     var position = countChildren(ref) + 1;
     var paragraghQuestion = {
       "questionText": question,
       "type": "Paragraph",
       "currentPosition": position
     };
     
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
     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
     var position = countChildren(ref) + 1;
     var optionArray = $scope.multiOptions;
     var options={};
     optionArray.forEach(function(item, index) {
       options["option"+index]=item;
     }); 
     
     var multiOptionsQuestion = {
       "questionText": question,
       "options":options,
       "type": "MultipleChoices",
       "currentPosition": position
     }
    
    console.log(multiOptionsQuestion);
     //recover to original state
     this.question = "Please describe question";
     $scope.multiOptions = ["option1"];

     
    firebaseService.pushDataWithUniqueID(ref, multiOptionsQuestion);
   };


   // Dropdown
   $scope.dropdowns = ["option1"];

   $scope.saveDropdown = function(question) {
     console.log(question);
     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
     var position = countChildren(ref) + 1;
     var optionArray = $scope.dropdowns;
     var options={};
     optionArray.forEach(function(item, index) {
       options["option"+index]=item;
     }); 
     var dropdownQuestion = {
       "questionText": question,
       "options":options,
       "type": "dropdown",
       "currentPosition": position
     };
     
     console.log(dropdownQuestion);
     this.question = "Please describe question";
     $scope.dropdowns = ["option1"];
    firebaseService.pushDataWithUniqueID(ref, dropdownQuestion);
   };



   // Check box
   $scope.checkboxes = ["option1"];

   $scope.saveCheckbox = function(question) {
     console.log(question);
     var ref = 'Quizzes/' + $scope.quizSelected +'/questions';
     var position = countChildren(ref) + 1;
     var optionArray = $scope.checkboxes;
     var options={};
     optionArray.forEach(function(item, index) {
       options["option"+index]=item;
     }); 
     var checkboxQuestion = {
       "questionText": question,
       "options":options,
       "type": "checkbox",
       "currentPosition": position
     }

     //recover
     this.question = "Please describe question";
     $scope.checkboxes = ["option1"];
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
   
//   $scope.update = function() {
//       var updates = {};
//     updates['/options/low/'] = "Unable or unwilling";
//     updates['/options/high/'] = "Outstanding";
//     console.log(updates);
//     return firebase.database().ref('Quizzes/Quiz4/questions/-KR59B2an_7AJPvsllTE').update(updates);
    
//   }
   // $("#sortable").sortable();//jquery ui sortable
}]);