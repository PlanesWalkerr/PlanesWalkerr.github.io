angular.module('myApp')
    .factory('movieService', function ($http, $localStorage, $q) {
        // localStorage for caching requests
        $localStorage = $localStorage.$default({
            requests: {}
        });
        var displayedMovies = 0, totalMovies = 0, url = "", searchTitle = "";

        // caching request
        function cacheRequest(data) {
            $localStorage.requests[url] = data;
            return data;
        }

        // is request cached
        function isCached(url) {
            return url in $localStorage.requests;
        }

        // retrieving from localStorage
        function getFromCache(url) {
            return $localStorage.requests[url]
        }

        // clear all cache
        function clearCache() {
            $localStorage.requests = {};
        }

        // request to api
        function getResults(params) {
            url = "https://www.omdbapi.com/?" + params;
            if (!isCached(url)) {
                // http request if url is not cached yet
                return $http.get(url).then(cacheRequest);
            } else {
                // or retrieving data from localStorage
                return $q.when(getFromCache(url));
            }
        }

        // compacting results into array 2x5 to display (one page of results contains 10 movies)
        function compactIntoArray(array, data) {
            for (var i = 0; i < 2 && displayedMovies < totalMovies; i++) {
                array[array.length] = [];
                for (var j = 0; j < 5 && displayedMovies < totalMovies; j++, displayedMovies++) {
                    array[array.length - 1].push(data.Search[j + i * 5]);
                }
            }
            return array;
        }

        // setting number of total results and resetting number of already displayed results
        function setTotalMovies(value) {
            totalMovies = value;
            displayedMovies = 0;
        }



        // are all results processed
        function isAllDisplayed() {
            return displayedMovies == totalMovies;
        }

        function getSearchTitle() {
            return searchTitle;
        }

        // saving search title
        function setSearchTitle(search) {
            searchTitle = search;
        }

        return {
            getResults: getResults,
            setTotalMovies: setTotalMovies,
            compactIntoArray: compactIntoArray,
            isAllDisplayed: isAllDisplayed,
            clearCache: clearCache,
            getSearchTitle: getSearchTitle,
            setSearchTitle: setSearchTitle
        };
    });

