myApp.controller('favesController', ['$scope', '$http', function($scope, $http){
  console.log('favesController is working');

  $scope.favorites = [];

  $scope.favCount = '';

  getFaves();


  function getFaves(){
    $http.get('/favorites').then(function(response){
      if(response.status == 200) {
        $scope.favorites = response.data;
        console.log('response.id', response.id);
        $scope.favCount = $scope.favorites.length;
      }
      else {
        console.log('error getting favorites');
      }
    });
  }

  $scope.deleteFavorites = function(favorite) {
    console.log('delete button clicked');
    console.log('favorite.pet_id', favorite.pet_id);
    $http.delete('/favorites/' + favorite.pet_id).then(function(response){
      if(response.status == 500) {

        console.log('error deleting pets.')

      }
      else {
      getFaves();
      }
    });
  }
}]);
