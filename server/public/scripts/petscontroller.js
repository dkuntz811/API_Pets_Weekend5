myApp.controller('petsController', ['$scope', '$http', function ($scope, $http){
  var key = '0ef1af2b16ac6dd5c174186f2fb3f09d';
  var baseURL = 'http://api.petfinder.com/';
  $scope.breed = '';

     //Types for options dropdown menu
  $scope.types = [
    {type: "cat", label: "Cats"},
    {type: "dog", label: "Dogs"},
    {type: "barnyard", label: "Barnyard Animals"},
    {type: "horse", label: "Horses"},
    {type: "bird", label: "Birds"},
    {type: "pig", label: "Pigs"},
    {type: "fish", label: "Fish"},
    {type: "reptile", label: "Reptile"},
    {type: "smallfurry", label: "Small & Furry Friends"}

  ];



  $scope.getRandomPet = function() {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    // query += '&animal=cat';
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
        // $scope.breed = $scope.animal.animal.$t;
        // $scope.getBreeds();
      }
    )
  }

  $scope.getStartingPet = function() {
  var query = 'pet.getRandom';
  query += '?key=' + key;
  //query += '&animal=' + $scope.selectedType;
  query += '&output=basic';
  query += '&format=json';

  var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
  console.log(request);

  $http.jsonp(request).then(
    function(response) {
      $scope.animal = response.data.petfinder.pet;
    }
  )
}
}]);

// myApp.controller('APIController', ['$scope', '$http', function($scope, $http) {
//

//   $scope.getBreeds = function() {
//     var query = 'breed.list';
//     query += '?key=' + key;
//     query += '&animal=' + $scope.breed.toLowerCase();
//     query += '&format=json';
//
//     var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
//
//     console.log(request);
//
//     $http.jsonp(request).then(
//       function(response) {
//         console.log('breeds: ', response.data);
//         $scope.breeds = response.data.petfinder.breeds.breed;
//       }
//     )
//   }
//
// }]);