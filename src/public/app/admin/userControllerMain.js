'use strict';

angular.module('myapp.admin')
  .controller('userControllerMain', ['$scope', '$http', 'growl', function ($scope, $http, growl) {

    $scope.hideFilter = true;
    $scope.hideAddRow = true;
    $scope.action = "none";

    var refresh = function() {
      $http.get('/api/users/').success(function(response) {
        console.log("I got the data I requested");
        $scope.userlist = response;
        $scope.user = "";
      });
    };

    refresh();

    $scope.addRecord = function(){
      $scope.hideAddRow = false;
      $scope.action = "add";
    };

    $scope.save = function() {
      switch($scope.action)
      {
        case "add":
          $scope.addUser();
          break;

        case "edit":
          $scope.update();
          break;
      }
    }

    $scope.addUser = function() {
      console.log($scope.user);
      $http.post('/api/users/register', $scope.user).success(function(response) {
        console.log(response);
        refresh();
        $scope.action = "none";
        $scope.hideAddRow = true;
      });
    };

    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/api/users/' + id).success(function(response) {
        refresh();
        growl.info(parse("User with %s deleted successfully", "slkfd"));
      });
    };

    $scope.edit = function(id) {
      console.log(id);
      $http.get('/api/users/' + id).success(function(response) {
        $scope.user = response;
        $scope.hideAddRow = false;
        $scope.action = "edit";
      });
    }; 

    $scope.update = function() {
      console.log($scope.user._id);
      $http.put('/api/users/' + $scope.user._id, $scope.user).success(function(response) {
        refresh();
        $scope.action = "none";
        $scope.hideAddRow = true;
      })
    };

    $scope.deselect = function() {
      $scope.user = "";
      $scope.hideAddRow = true;
    }

  }]);
