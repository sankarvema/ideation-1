/*'use strict';

angular.module('myapp.admin')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/admin/user-view-main.html',
        controller: 'userControllerMain'
      })

      .when('/groups', {
        templateUrl: '/app/admin/group-view-main.html',
        controller: 'groupControllerMain'
      })

      .when('/groups/:id/edit', {
        templateUrl: '/app/admin/group-view-edit.html',
        controller: 'groupControllerMain'
     });

  }]);*/

'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('myapp.admin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/'
                , templateUrl: '/app/admin/user-view-main.html'
                , controller: 'userControllerMain'
            })
            .state('groups', {
                url: '/groups'
                , templateUrl: '/app/admin/group-view-main.html'
                , controller: 'userControllerMain'

            })
            .state('groupsEdit', {
                url: '/groups/:id/edit'
                , templateUrl: '/app/admin/group-view-edit.html'
                , controller: 'userControllerMain'
            });
    }
]);