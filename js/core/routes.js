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
    
    .when('/questions-generate',{
        templateUrl: 'pages/questionsGenerate.html',
        controller: 'questionsGenerateCtrl'
    })
    
    .when('/members-management',{
        templateUrl: 'pages/membersManagement.html',
        controller: 'membersManagementCtrl'
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