angular.module('myApp')
    .controller('mainCtrl', function ($scope, movieService, $timeout) {

        // clear cache and show success message on click
       $scope.clearCache = function () {
            movieService.clearCache();
            $scope.showMsg = true;
            $timeout(function () {
                $scope.showMsg = false;
            },3000);
        }
    });