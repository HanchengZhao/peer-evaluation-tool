// question types
app.directive("linearScale", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/linearScale.html',
        replace: false,
        scope:{
            question: "=",
            low: "=",
            high: "=",
            name: "@",
            inputShow: "@",
            buttonShow: "@",
            deleteQuestionFunction: "&",
            uniqueId:"="
        }
    }
});

app.directive("paragraph", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/paragraph.html',
        replace: false,
        scope:{
            question: "=",
            rows: "=",
            inputShow: "@",
            buttonShow: "@",
            deleteQuestionFunction: "&",
            uniqueId:"="
        }
    }
});

app.directive("multiChoices", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/multiChoices.html',
        replace: false,
        scope:{
            question: "=",
            rows: "=",
            inputShow: "@",
            buttonShow: "@",
            deleteQuestionFunction: "&",
            uniqueId:"=",
            multiOptions:"="
        }
    }
});

app.directive("dropdown", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/dropdown.html',
        replace: false,
        scope:{
            question: "=",
            rows: "=",
            inputShow: "@",
            buttonShow: "@",
            deleteQuestionFunction: "&",
            uniqueId:"=",
            dropdowns:"="
        }
    }
});

app.directive("checkbox", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/checkBox.html',
        replace: false,
        scope:{
            question: "=",
            rows: "=",
            inputShow: "@",
            buttonShow: "@",
            deleteQuestionFunction: "&",
            uniqueId:"=",
            checkboxes:"="
        }
    }
});


//member table

app.directive("membersTable", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/membersTable.html',
        replace: false,
        scope:{
            firstname: "=",
            lastname: "=",
            Class: "=",
            credits: "=",
            major :"=",
            semesters :"=",
            email:"=",
            team:"="
        }
    }
});
