/**
* ChristmasApp Module
*
* Description
*/
var IndexCtrl = function($scope) {

};

var PlansCtrl = function ($scope) {
  $scope.plans = [
  	{name: "Joe", details: "Going Home"},
  	{name: "Dan", details: "Staying in"}
  ];

  $scope.yourPlan = "Something else";
};

var EventsCtrl = function ($scope) {
  $scope.events = [
    {
      suggested: 'Dan',
      details: 'Explosions!',
      id: 2,
      votes: 4
    }
  ];

  $scope.voteUp = function(id) {

  };

  $scope.suggest = function() {

  };
};

var YourGiftsCtrl = function ($scope) {
  $scope.requests = [
    {
      name: 'Race car',
      description: 'on amazon.com'
    }
  ];
};

var BuyGiftsCtrl = function($scope) {
  $scope.people = [
    'Dan',
    'Alicia'
  ];

  $scope.gifts = [
    {
      name: 'Alicia',
      description: 'Calendar',
      buyers: [
        'Dan'
      ]
    },
    {
      name: 'Alicia',
      description: 'Calendar',
      buyers: [
        'Dan'
      ]
    }
  ];

  $scope.selectPerson = function (person) {
    $scope.personSelected = person;
  };

  $scope.clearPerson = function () {
    $scope.personSelected = false;
  }
};

angular.module('ChristmasApp', [])
  .config(function ($routeProvider) {
  	$routeProvider.when('/', {templateUrl: 'layouts/index', controller: IndexCtrl});
    $routeProvider.when('/plans', {templateUrl: 'layouts/plans', controller: PlansCtrl});
    $routeProvider.when('/events', {templateUrl: 'layouts/events', controller: EventsCtrl});
    $routeProvider.when('/yourgifts', {templateUrl: 'layouts/yourgifts', controller: YourGiftsCtrl});
    $routeProvider.when('/buygifts', {templateUrl: 'layouts/buygifts', controller: BuyGiftsCtrl});
  });