var app = angular.module("advisorApp", ["firebase"]);

app.controller("authCtrl", function($scope, $firebaseAuth) {
  $scope.authObj = $firebaseAuth();
    // $scope.userPic = $('#user-pic');
    //login with google
    
    $scope.signIn = function(){
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
      $scope.userPic.css('background-image','url(' + $scope.profilePicUrl + ')');
      console.log("Signed in as:", firebaseUser.displayName);
      
    } else {
      $scope.firebaseUser = false;
      console.log("Signed out");
      $scope.userPic.css('background-image','url(/images/profile_placeholder.png)');
      
    }
  });

}); //authCtrl

app.controller("questionCtrl", ["$scope", "$firebaseObject", "$firebaseArray",
  function($scope, $firebaseObject, $firebaseArray) {

    $scope.types = ["Linear scale", "Multiple choice", "Paragraph", "Dropdown", "Check box"];
    $scope.question = "Please describe question";

    // Linear scale part
    $scope.low = "low";
    $scope.high = "high";
    $scope.saveLinearScale = function(question, low, high) {
      console.log(question);
      var linearScaleQuestion = {
        "question": question,
        "low": low,
        "high": high
      };
      alert("Question saved");
      var newKey = firebase.database().ref().child('Questions').child('LinearScale').push().key;

      var updates = {};
      updates['/Questions/LinearScale/' + newKey] = linearScaleQuestion;

      return firebase.database().ref().update(updates);
    };

    // Paragraph part
    $scope.saveParagraph = function(question) {
      console.log(question);
      var paragraghQuestion = {
        "question": question,
      };
      var newKey = firebase.database().ref().child('Questions').child('Paragraph').push().key;

      var updates = {};
      updates['/Questions/Paragraph/' + newKey] = paragraghQuestion;

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
      }
      optionArray.forEach(function(item, index) {
        multiOptionsQuestion['option' + index + 1] = item;
      })
      
      //recover to original state
      alert('Question saved');
        $scope.question = "Please describe question";
        console.log($scope.question);
       $scope.multiOptions = ["option1"];

      var newKey = firebase.database().ref().child('Questions').child('MultipleChoices').push().key;

      var updates = {};
      updates['/Questions/MultipleChoices/' + newKey] = multiOptionsQuestion;

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
      //recover
      alert('Question saved');
      $scope.dropdowns = ["option1"];
      var newKey = firebase.database().ref().child('Questions').child('Dropdown').push().key;

      var updates = {};
      updates['/Questions/Dropdown/' + newKey] = dropdownQuestion;

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
      $scope.question = "Please describe question";
      $scope.checkboxes = ["option1"];
      alert('Question saved');
      var newKey = firebase.database().ref().child('Questions').child('Checkbox').push().key;

      var updates = {};
      updates['/Questions/Checkbox/' + newKey] = checkboxQuestion;

      return firebase.database().ref().update(updates);
    };

  }
]);


app.controller("viewCtrl", ["$scope", "$firebaseObject", "$firebaseArray",
  function($scope, $firebaseObject, $firebaseArray) {

    // var ref = firebase.database().ref();

    // var obj = $firebaseObject(ref);

    // var list = $firebaseArray(ref);
    // // $scope.list= list;
    // var checkboxRef= ref.child('Questions');
    // var query = checkboxRef.orderByChild("timestamp").limitToLast(10);
    // // to take an action after the data loads, use the $loaded() promise
    // obj.$loaded().then(function() {
    //   // console.log("loaded record:", obj.$id, obj.questions);
    //   // To iterate the key/value pairs of the object, use angular.forEach()
    //   angular.forEach(obj, function(value, key) {
    //     console.log(key, value);
    //   });
    // });
    
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
    } 

    $scope.RetrieveData = function() {
      firebase.database().ref().on('value',function(snapshot) {
        var data = snapshot.val();
        var dataArray = [];
        var dataInJson =JSON.stringify(data);
        snapshot.forEach(function(record) {
          dataArray.push(record.val());
        });
        $scope.list = dataArray;
        console.log($scope.list);
      });
    };

  }
]);