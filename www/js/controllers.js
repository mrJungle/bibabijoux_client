angular.module("AirBibi")
.controller('AppCtrl', function ($scope, Restangular) {

    $scope.globalMethod = function(){
        console.log(1);

    };
    $scope.galleriaselezionata = ''
    $scope.globalMethod_cambiavar = function(a){
        $scope.galleriaselezionata = a;
    };
    $scope.collezioni = '';
    $scope.collezioniFromServer = function(){
        Restangular.all('collezioni').getList()
        .then(function(data){
            $scope.collezioni = data;
        });
    };
    $scope.collezioniFromServer(); 
})


.controller('HomeCtrl',  function ($scope, $document, $state) {
    $('html, body').animate({scrollTop : 0},800);
    $('.navbar').removeClass('navbar-shrink');
    console.log($scope.collezioni);
    // TODO spostare dentro un modulo
    $document.on('scroll', function() {
      //console.log('Document scrolled to ', $document.scrollLeft(), $document.scrollTop());
      if ($document.scrollTop() > 100) {
            $('.scrollToTop_d').fadeIn();
        } else {
            $('.scrollToTop_d').fadeOut();
        }
    });
//    $scope.scrolla = function() {
//        scrollTo(0, $( '#services').offset().top   ,[0.1, [0.20000]]);
//    };
    $scope.select_collection = function(a) {
        console.log(a);
        $scope.globalMethod_cambiavar(a)
        $state.go('bijoux');
//        scrollTo(0, $( '#portfolio').offset().top   ,[0.1, [0.20000]]);
    };
})

.controller('BijouxCtrl', function ($scope, Restangular) {
    $('html, body').animate({scrollTop : 0},800);
    $('.navbar').removeClass('navbar-shrink');
    console.log($scope.collezioni);
    console.log($scope.galleriaselezionata);
    $scope.prodotti = [];
    $scope.filters = {
        min_price : null,
        max_price : null,
        title_contains:null,
        collezione_name:null
    };
    if ($scope.galleriaselezionata != '' ) {$scope.filters.collezione_name=$scope.galleriaselezionata;}
    console.log($scope.filters);
    var updating = false;
    $scope.rangeFilter = [0, 100]
    $scope.deseleziona = function(a) {
        $('.btn .btn-primary .collezioni_sel').addClass('btn-default').removeClass('btn-primary');

    };

    var updateFromServer = function(page){
        updating = true;
        var params = angular.copy($scope.filters);
        params.page = page;

        if(page == 1){
            $scope.prodotti = [];
        }

        Restangular.all('prodotti').getList(params)
        .then(function(data){
            console.log("response", data.metadata.count);
            $scope.prodotti = $scope.prodotti.concat(data);
            $scope.metadata = data.metadata;
            updating = false;
        });
    };

    $scope.updateProdotti = function(){
        if(updating){return;}
        if($scope.metadata && $scope.metadata.next){
            updateFromServer($scope.metadata.number + 1);
        }
    };

    
    
    $scope.search = function(){
        console.log("filters", $scope.filters);
        updateFromServer(1);
    }

    $scope.updatePriceRange = function(){
        $scope.filters.min_price = $scope.rangeFilter[0];
        $scope.filters.max_price = $scope.rangeFilter[1];

    };
    
    $scope.$watch('filters', function(nv, ov){
        if(angular.equals(nv, ov)){
            return;
        }
        $scope.search();

    }, true)

    $scope.filtra_collezione = function(a) {
        $('.btn .btn-default .collezioni_sel').addClass('btn-primary').removeClass('btn-default');
        $scope.filters.collezione_name = a;
    }

    updateFromServer(1);
})

.controller('RecensioniCtrl', function ($scope, Restangular) {
    $('html, body').animate({scrollTop : 0},800);
    $('.navbar').removeClass('navbar-shrink');
    console.log("RecensioniCtrl")
    $scope.recensioni = [];
    var updateFromServer = function(){
        Restangular.all('recensioni').getList()
        .then(function(data){
            console.log("response", data.metadata.count);
            $scope.recensioni = data;
            $scope.metadata = data.metadata;
        });
    };    
    updateFromServer();
})

.controller('ContattiCtrl', function ($scope, Restangular) {
    console.log("ContattiCtrl")
    $('html, body').animate({scrollTop : 0},800);
    $('.navbar').removeClass('navbar-shrink');        

})




.controller('BooksCtrl', function ($scope, Restangular) {
    console.log("Books")

    $scope.books = [];
    $scope.filters = {
        min_price : null,
        max_price : null,
        title_contains :null
    };
    var updating = false;
    $scope.rangeFilter = [0, 100]

    var updateFromServer = function(page){
        updating = true;
        var params = angular.copy($scope.filters);
        params.page = page;

        if(page == 1){
            $scope.books = [];
        }

        Restangular.all('prodotti').getList(params)
        .then(function(data){
            console.log("response", data.metadata.count);
            $scope.books = $scope.books.concat(data);
            $scope.metadata = data.metadata;
            updating = false;
        });
    };

    $scope.updateBooks = function(){
        if(updating){return;}
        if($scope.metadata && $scope.metadata.next){
            updateFromServer($scope.metadata.number + 1);
        }
    };

    
    
    $scope.search = function(){
        console.log("filters", $scope.filters);
        updateFromServer(1);
    }

    $scope.updatePriceRange = function(){
        $scope.filters.min_price = $scope.rangeFilter[0];
        $scope.filters.max_price = $scope.rangeFilter[1];

    };
    
    $scope.$watch('filters', function(nv, ov){
        if(angular.equals(nv, ov)){
            return;
        }
        $scope.search();

    }, true)

    updateFromServer(1);


})



