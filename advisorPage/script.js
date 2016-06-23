// Initialize Firebase
var config = {
 apiKey: "AIzaSyAjHp1OIGV2kHqTq2J9eFa88GhtuuVDOpM",
 authDomain: "project-2114532762902987550.firebaseapp.com",
 databaseURL: "https://project-2114532762902987550.firebaseio.com",
 storageBucket: "",
};
firebase.initializeApp(config);


var app = angular.module("advisorApp", ["firebase"]);

app.controller("authCtrl", function($scope, $firebaseAuth) {
 $scope.authObj = $firebaseAuth();
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
     // console.log($scope.profilePicUrl);
     // $("#user-pic").css('background-image','url(https://lh4.googleusercontent.com/-wnTI5FMslk8/AAAAAAAAAAI/AAAAAAAAAzk/xRUP7BTC8EE/s96-c/photo.jpg)');
     $scope.userPic.css('background-image', 'url(' + $scope.profilePicUrl + ')');
     console.log("Signed in as:", firebaseUser.displayName);

   } else {
     $scope.firebaseUser = false;
     console.log("Signed out");
     $scope.userPic.css('background-image', 'url(/images/profile_placeholder.png)');

   }
 });

}); //authCtrl

app.controller("questionCtrl", ["$scope", "$firebaseObject", "$firebaseArray",
 function($scope, $firebaseObject, $firebaseArray) {

   $scope.types = ["Linear scale", "Multiple choice", "Paragraph", "Dropdown", "Check box"];
   $scope.question = "Please describe question";
   
   
  firebase.database().ref("Quizzes").on('value', function(snapshot) {
       var dataArray = [];
       snapshot.forEach(function(record) {
         dataArray.push(record.key);
         console.log(record.key);
       });
       $scope.quizzesID = dataArray;
       console.log($scope.quizzesID);
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
    // var newKey = firebase.database().ref().child('Quizzes').push().key;

     var updates = {};
     updates['/Quizzes/' + "Quiz"+length] = newQuiz;
     
      $scope.quizTitle = "";
      $scope.startDate = "";
      $scope.endDate = "";

     return firebase.database().ref().update(updates);
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

     var newKey = firebase.database().ref().child('Quizzes/' + $scope.quizSelected).push().key;

     var updates = {};
     updates['/Quizzes/' +$scope.quizSelected+'/'+ newKey] = linearScaleQuestion;

     this.question = "Please describe question";
     return firebase.database().ref().update(updates);
   };

   // Paragraph part
   $scope.saveParagraph = function(question) {
     console.log(question);
     var paragraghQuestion = {
       "questionText": question,
       "type": "Paragraph",
       "currentPostion": "?"
     };
     var newKey = firebase.database().ref().child('Quizzes/' + $scope.quizSelected).push().key;
     console.log(newKey);
     var updates = {};
     updates['/Quizzes/' +$scope.quizSelected+'/'+ newKey] = paragraghQuestion;

     this.question = "Please describe question";
     return firebase.database().ref().update(updates);
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
       multiOptionsQuestion["options"]+={index : item};
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

 }
]);


app.controller("viewCtrl", ["$scope", "$firebaseObject", "$firebaseArray",
 function($scope, $firebaseObject, $firebaseArray) {

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
     firebase.database().ref("Questions-Data").on('value', function(snapshot) {
       var data = snapshot.val();
       var dataArray = [];
       var dataInJson = JSON.stringify(data);
       snapshot.forEach(function(record) {
         dataArray.push(record.val());
       });
       $scope.list = dataArray;
       console.log($scope.list);
     });
   };
   // used for Copy data
   //     $scope.oldRef = firebase.database().ref();
   //     $scope.newRef = firebase.database().ref("Questions-Data");

   //     $scope.copyFbRecord = function(oldRef, newRef) {    
   //     oldRef.once('value', function(snap)  {
   //           newRef.set( snap.val(), function(error) {
   //               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
   //           });
   //     });
   // }
   //   $(function  () {
   //   $("ul.example").sortable();
   // });



 }
]);