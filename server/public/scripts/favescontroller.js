myApp.controller('favesController', ['$scope', '$http', function($scope, $http){
  console.log('favesController is working');

  $scope.favorites = [];
  $scope.favCount = '';
  function getFaves(){
    $http.get('/favorites').then(function(response){
      if(response.status == 200) {
        $scope.favorites = response.data;
        $scope.favCount = $scope.favorites.length;
      }
      else {
        console.log('error getting favorites');
      }
    });
  }
}]);
