var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(['$routeProvider', function ($routeProvider){
  $routeProvider.
    when("/pets", {
      templateUrl: "/views/partials/pets.html",
      controller: "petsController"
    }).
    when("/dogs", {
      templateUrl: "/views/partials/dogs.html",
      controller: "dogController"
    }).
    when("/random", {
      templateUrl: "/views/partials/random.html",
      controller: "randomController"
    }).
    otherwise({
      redirectTo: "/random"
    });
}]);
