// DIRECTIVES
app.directive("linearScale", function(){
    return{
        restrict: 'E',
        templateUrl: 'directives/linearScale.html',
        replace: false,
        scope:{
            quesiton: "=",
            low: "=",
            high: "="
        }
    }
});