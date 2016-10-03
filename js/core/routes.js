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
    
    .when('/evaluation-results',{
        templateUrl: 'pages/evaluationResults.html',
        controller: 'evaluationResultsCtrl'
    })
    
    .when('/student-page',{
        templateUrl: 'pages/studentPage.html',
        controller: 'studentCtrl'
    })
    
    .when('/peer-evaluation',{
        templateUrl: 'pages/peerEvalPage.html',
        controller: 'peerEvalCtrl'
    })
    
    .when('/view-my-grade',{
        templateUrl: 'pages/viewMyGrade.html',
        controller: 'viewMyGradeCtrl'
    })
    
    .when('/about',{
        templateUrl: 'pages/about.html',
        controller: 'aboutCtrl'
    })
    
    .when('/invalid-login',{
        templateUrl: 'pages/invalid_login.html',
        controller: 'invalidCtrl'
    })
    
})