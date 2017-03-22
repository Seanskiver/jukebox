var myApp = angular.module('myApp', []);

myApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);

function GreetingController($scope) {
  $scope.greeting = 'Hola!';
}