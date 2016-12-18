angular.module('autoz', [
    'ngSanitize',
    'ngAnimate',
    'ngResource',
    'ui.bootstrap',
    'ui.router',
    'ui.select',
    'angularFileUpload',
    'blockUI'
])

.config(function($stateProvider, $urlRouterProvider){

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/home.html"
    })
    .state('search', {
      url: "/search/:terms",
      templateUrl: "views/search.html"
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "views/admin.html"
    });      	

})

.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

}]);