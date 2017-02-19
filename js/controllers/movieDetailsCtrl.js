angular.module('myApp')
    .controller('movieDetailsCtrl', function ($scope, $http, $stateParams, movieService) {
        var params = "";
        var id = $stateParams.id;

        // request to api by id
        $scope.getMovie = function () {
            params = "i=" + id + "&tomatoes=true&plot=full";
           movieService.getResults(params)
                .then(
                    function (response) {
                        $scope.details = response.data;
                    });
        };
        $scope.getMovie();
    });