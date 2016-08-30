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
       "currentPosition": "?"
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
       "currentPosition": "?"
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
       "currentPosition": "?"
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
       "currentPosition": "?"
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
       "currentPosition": "?"
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
   
   $("#sortable").sortable();//jquery ui sortable
}]);