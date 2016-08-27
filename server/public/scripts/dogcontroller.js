

myApp.controller('dogController', ['$scope', '$http', function($scope, $http) {
  var key = '0ef1af2b16ac6dd5c174186f2fb3f09d';
  var baseURL = 'http://api.petfinder.com/';
  $scope.breed = '';

  $scope.getRandomPet = function() {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=dog';
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
  }]);


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
//
