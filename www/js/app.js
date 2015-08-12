
angular.module("AirBibi", ['ui.router', 'restangular', 'infinite-scroll', 'ui.bootstrap-slider', 'duScroll'])

.config(function($stateProvider, $urlRouterProvider, RestangularProvider){

    var baseServerUrl = 'http://bibabijouxs-server.trecode.webfactional.com/rest/';
    RestangularProvider.setBaseUrl(baseServerUrl);

    RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
        var newResponse;
        if (operation === "getList") {
            newResponse = response.results != undefined ? response.results : response;
            newResponse.metadata = {
              count : response.count,
              next : response.next,
              previous : response.previous,
              number : response.number,
            }
        } else {
            newResponse = response;
        }
        return newResponse;
    });
  
    RestangularProvider.setRequestSuffix('/?');
    
    $urlRouterProvider.otherwise("/home");
    //
    // Now set up the states
    $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller  :'HomeCtrl'
    })
    .state('bijoux', {
      url: "/bijoux",
      templateUrl: "templates/bijoux.html",
      controller  :'BijouxCtrl'
    })
    .state('recensioni', {
      url: "/recensioni",
      templateUrl: "templates/recensioni.html",
      controller  :'RecensioniCtrl'
    })
    .state('contatti', {
      url: "/contatti",
      templateUrl: "templates/contatti.html",
      controller  :'ContattiCtrl'      
    })

})
.run(function(){
    console.log("run here")
})
