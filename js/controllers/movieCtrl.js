angular.module('myApp')
    .controller('movieCtrl', function ($scope, $http, $cacheFactory, $localStorage, movieService) {

            var types = ["", "movie", "series", "episode"];
            var currentType = types[0], currentYear = "", currentSearch = "", currentPage = 1, params = "";
            $scope.year = "";
            $scope.movieType = 0;
            $scope.search = movieService.getSearchTitle()==="" ?"Sherlock Holmes" : movieService.getSearchTitle();
            $scope.movies = [[]];

            // load next portion of results when page is scrolled
            $scope.loadMore = function () {
                if (!movieService.isAllDisplayed()) {
                    currentPage++;
                    params = "s=" + currentSearch + "&y=" + currentYear + "&type=" + currentType + "&page=" + currentPage;
                    movieService.getResults(params)
                        .then(function (response) {
                            $scope.movies = movieService.compactIntoArray($scope.movies, response.data);
                        });
                }
            };

            // capturing search options
            $scope.initSearch = function () {
                if($scope.search) {
                    // reset movie array
                    $scope.movies = [[]];
                    currentType = types[$scope.movieType];
                    currentSearch = $scope.search;
                    currentYear = $scope.year;
                    currentPage = 1;
                }
            };

            // fetching first page of results
            $scope.fetch = function () {
                if($scope.search) {
                    movieService.setSearchTitle(currentSearch);
                    params = "s=" + currentSearch + "&y=" + currentYear + "&type=" + currentType + "&page=" + currentPage;
                    movieService.getResults(params)
                        .then(function (response) {
                            $scope.results = response.data;
                            if (response.data.Response === "True") {
                                $scope.totalMovies = response.data.totalResults;
                                movieService.setTotalMovies($scope.totalMovies);
                                $scope.movies = movieService.compactIntoArray($scope.movies, response.data);
                            }
                        });
                }
            };

        // select whole search string on click
        $scope.select = function () {
            this.setSelectionRange(0, this.value.length);
        };

            $scope.initSearch();
            $scope.fetch();
        }
    );