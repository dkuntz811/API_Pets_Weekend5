myApp.controller('petsController', ['$scope', '$http', function ($scope, $http){
  console.log('petsController working');


  $scope.animal = [];
  $scope.animalType='';
  $scope.pet = {};
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

  $scope.changeAnimal = function(){
    if($scope.animalType != ''){
      $scope.getRandomPet();
    }
  }

  $scope.getRandomPet = function() {
    var key = '0ef1af2b16ac6dd5c174186f2fb3f09d';
    var baseURL = 'http://api.petfinder.com/';
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.animalType;
    // query += '&animal=cat';
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.pet = response.data.petfinder.pet;
        // $scope.animal.push($scope.getRandom);

        console.log('animal in', $scope.pet);
      }
    );
  }

  $scope.addToFavorites = function(){
    console.log('button clicked');
    console.log('scope.pet ', $scope.pet);
    var favorite = {
      pet_id: $scope.pet.id.$t,
      pet_image: '',
      pet_name: $scope.pet.name.$t,
      pet_description: '',

    };
       console.log('favorite is', favorite);


    if($scope.pet.description.$t){
      favorite.description = $scope.pet.description.$t.substring(0,100);
    }
    var photos = $scope.pet.media.photos;
    if(photos != undefined){
      favorite.image = photos.photo[0].$t;
    }
    console.log('new favorite:', favorite);

    $http.post('/favorites', favorite).then(function(response){
      if(response.status == 201) {
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
