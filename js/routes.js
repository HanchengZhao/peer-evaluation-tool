//Routes
app.config(function($routeProvider){
    $routeProvider
    
    .when('/',{
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
    })
    
    .when('/advisor-page',{
        templateUrl: 'pages/advisorPage.html',
        controller: 'advisorCtrl'
    })
    
    .when('/student-page',{
        templateUrl: 'pages/studentPage.html',
        controller: 'studentCtrl'
    })
    
    .when('/about',{
        templateUrl: 'pages/about.html',
        controller: 'aboutCtrl'
    })
})