'use strict';

angular.module('myapp.admin')
  .controller('userProfileController', ['$scope', '$http', 'growl', function ($scope, $http, growl) {

    var refresh = function() {
      $http.get('/api/users/current').success(function(response) {
        console.log("I got the data I requested");
        $scope.currentUser = response;
      });
    };

    refresh();

}])