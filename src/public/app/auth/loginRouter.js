'use strict';

var app=angular.module('ideation.auth');

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/login', {
    		templateUrl: '/app/auth/login.html',
    		controller: 'loginController'
      })

    	.when('/home', {
    		templateUrl: '/app/dboard/home.html',
        controller: 'homeController'
      })

      .when('/register', {
        templateUrl: '/app/auth/register.html',
        controller: 'userController'
      })

      .when('/forgotPassword', {
        templateUrl: '/app/auth/forgotPassword.html',
        controller: 'userController'
      })

      //.otherwise({redirectTo: '/login'});

  }]);

/*app.run(function($rootScope, $location, loginService){
    var publicRoutes = ['/login', '/register', '/forgotPassword']; // list of public routes
    console.log('Event fired:: app run');

    $rootScope.$on('$routeChangeStart', function(){
      console.log('Event RouteChange->Start '  + "@[" + $location.path() + "] when loggedin is " + loginService.isLogged());
      if(publicRoutes.indexOf($location.path()) ==-1 && !loginService.isLogged() ){
        console.log('access denied!!!');
        $location.path('login');
      }
    });
  });*/