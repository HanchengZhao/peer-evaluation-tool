// SERVICES
app.service('firebaseService', function() {
    this.retrieveData = function(ref){
       var dataArray = [];
       firebase.database().ref(ref).on('value', function(snapshot) {
           snapshot.forEach(function(record) {
             dataArray.push(record.val());
           });
        });
        return dataArray;
    };
    
    this.pushData = function(ref, obj){
        var updates = {};
         updates[ref] = obj;
         return firebase.database().ref().update(updates);
    };
    
    this.pushDataWithUniqueID = function(ref, obj){
        var newKey = firebase.database().ref().child(ref).push().key;
        var updates = {};
        updates[ref +'/'+ newKey] = obj;
        return firebase.database().ref().update(updates);
    };
    
    this.advisorCheck = function(){
        var user = firebase.auth().currentUser;
        if (user != null) {//verify whether the user has logged in
            var email = user.email;
            firebase.database().ref("Advisors")
            .orderByChild("email")
            .startAt(email)
            .endAt(email)
            .once('value').then(function(snapshot){
              if(snapshot.val()!== null){
                  //advisor login
              }else{
                  window.location.href = "/";
              }
            });
        }else{
        window.location.href = "/";
        }
    };
    

    
});