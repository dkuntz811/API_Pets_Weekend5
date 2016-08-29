

myApp.controller('favesController', ['$scope', '$http', function($scope, $http) {
  var key = '0ef1af2b16ac6dd5c174186f2fb3f09d';
  var baseURL = 'http://api.petfinder.com/';
  $scope.breed = '';

  $scope.getRandomPet = function() {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=dog';
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) +  '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
        $scope.breed = $scope.animal.animal.$t;
      
      }
    )
  }

  $scope.deleteFavorites= function (id) {
  if (confirm("Are you sure you want to delete this pet from Favorites?")){
    $http.delete('/pets/' + id)
      .then(function (response) {
        getFavorites();
      });
  }
};

function getFavorites() {
  $http.get('/pets')
    .then(function (response) {
      response.data.forEach(function (pet) {
      });
       $scope.favorites = response.data;
       $scope.favoriteCount = $scope.favorites.length;
    });
}

$scope.addtoFavorites = function () {
  currentPet.petID = $scope.animal.id.$t;
  currentPet.petName = $scope.animal.name.$t;
  currentPet.imageURL = $scope.animal.media.photos.photo[3].$t;
  currentPet.description = $scope.animal.description.$t.substring(0, 100);

  console.log(currentPet);

  $http.post('/pets', currentPet)
    .then(function () {
      console.log('POST /pets');
      getFavorites();
      console.log('currentPet', currentPet);
    });

};

  // addToFavorites();
  // deleteFavorites();
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
