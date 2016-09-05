myApp.controller('petsController', ['$scope', '$http', function ($scope, $http){
  console.log('petsController working');
  var key = '0ef1af2b16ac6dd5c174186f2fb3f09d';
  var baseURL = 'http://api.petfinder.com/';

  $scope.animal = [];
  $scope.pets = {};
  $scope.favCount = 0;

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

  updateFavCount();

  $scope.getRandomPet = function() {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.animal;
    // query += '&animal=cat';
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
        // $scope.animal.push($scope.getRandom);

        console.log('animal in', $scope.animal);
      }
    );
  }

  $scope.addtoFavorites = function(){
    var favorite = {
      pet_id: $scope.pet.id.$t,
      ped_name: $scope.pet.name.$t,
      description: '',
      image: ''

    };
    if($scope.pet.description.$t){
      favorite.description = $scope.pet.description.$t.substring(0,100);
    }
    var photos = $scope.pet.media.photos;
    if(photos != undefined){
      favorite.image = photos.photo[0].$t;
    }
    console.log('new favorite:', favorite);

    $http.post('/favorites', favorite).then(function(response){
      if(reponse.status == 201) {
        console.log('saved favorite');
        updateFavCount();
      } else{
        console.log('error saving favorite');
      }
    });
  }

  function updateFavCount () {
    $http.get('favorites/count').then(function(response){
      console.log(response);
      $scope.favCount = response.data.count;
    });
  }

}]);
