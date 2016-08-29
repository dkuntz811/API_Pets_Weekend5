var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(['$routeProvider', function ($routeProvider){
  $routeProvider.
    when("/pets", {
      templateUrl: "/views/partials/pets.html",
      controller: "petsController"
    }).
    when("/faves", {
      templateUrl: "/views/partials/faves.html",
      controller: "favesController"
    }).
    when("/random", {
      templateUrl: "/views/partials/random.html",
      controller: "randomController"
    }).
    otherwise({
      redirectTo: "/random"
    });
}]);
