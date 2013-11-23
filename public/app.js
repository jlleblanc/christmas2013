/**
* ChristmasApp Module
*
* Description
*/
var IndexCtrl = function($scope) {

};

var PlansCtrl = function ($scope) {
  
};

var EventsCtrl = function ($scope) {
  
};

var YourGiftsCtrl = function ($scope ) {

};

var BuyGiftsCtrl = function($scope) {

};

angular.module('ChristmasApp', [])
  .config(function ($routeProvider) {
  	$routeProvider.when('/', {templateUrl: 'layouts/index', controller: IndexCtrl});
    $routeProvider.when('/plans', {templateUrl: 'layouts/plans', controller: PlansCtrl});
    $routeProvider.when('/events', {templateUrl: 'layouts/events', controller: EventsCtrl});
    $routeProvider.when('/yourgifts', {templateUrl: 'layouts/yourgifts', controller: YourGiftsCtrl});
    $routeProvider.when('/buygifts', {templateUrl: 'layouts/buygifts', controller: BuyGiftsCtrl});
  });
