angular.module('myApp', ["ui.router","ngMask","ngStorage"])
    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "templates/main.template.html"
            })
            .state('movie', {
                url: "/movie/:id",
                templateUrl: "templates/movieDetails.template.html",
                controller: "movieDetailsCtrl"
            })});

