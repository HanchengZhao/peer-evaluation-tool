// DIRECTIVES
app.directive("linearScale", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/linearScale.1.html',
        replace: false,
        scope:{
            question: "=",
            low: "=",
            high: "=",
            name: "@",
            inputShow: "@",
            buttonShow: "@",
            deleteQuestion: "&",
            uniqueId:"@"
        }
    }
});