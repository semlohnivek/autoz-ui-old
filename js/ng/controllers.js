angular.module('autoz')
.controller('topNavCtrl', topNavCtrl)
.controller('homeCtrl', homeCtrl)
.controller('searchCtrl', searchCtrl)
.controller('allPhotosModalCtrl', allPhotosModalCtrl)
;

function topNavCtrl($rootScope, $state) {
	
}

function homeCtrl() {
	var vm = this;
	
	vm.carouselInterval = 5000;
	vm.activeSlide = 0;
	vm.slides = [
	   {
	   	  imageUrl: "img/carousel1.jpg",
	   	  text: "We don't have this car!",
	   	  id: 0
	   },
	   {
	   	  imageUrl: "img/carousel2.jpg",
	   	  text: "Nor do we have this car...sorry.",
	   	  id: 1
	   },
	   {
	   	  imageUrl: "img/carousel3.jpg",
	   	  text: "Definitely do not have this car.",
	   	  id: 2
	   },
	   {
	   	  imageUrl: "img/carousel4.jpg",
	   	  text: "Wow, this is an amazing car. Not one of ours.",
	   	  id: 3
	   }	

	];

	vm.infoCubes = [
	   {
	   	  bgColor: '#B77600',
	   	  iconClass: 'fa-dollar',
	   	  header: 'VALUE',
	   	  text: 'We absolutely 100% guarantee your car will increase in value.'
	   },
	   {
	   	  bgColor: '#215A21',
	   	  iconClass: 'fa-car',
	   	  header: 'CARS',
	   	  text: 'Every car you see on this website will not be available.'
	   },
	   {
	   	  bgColor: '#00005F',
	   	  iconClass: 'fa-cloud-download',
	   	  header: 'VaaS',
	   	  text: 'Our new "Vehicle as a Service" cloud portal means faster response times.'
	   }	   	   
	];
}

function searchCtrl($rootScope, $scope, $state, $uibModal, Makes, Cars, SearchTerms) {

	var vm = this;

	// NOTE:  The 'criteria' object is defined on $rootScope so it's preserved as the user navigates
	//        throughout the site
	
	vm.makesMap = {};
	vm.makes = [];
	vm.terms = SearchTerms.get();

    //Hard-code the mileage and price options as they don't really follow a fixed pattern
    vm.mileages = [1000,5000,10000,20000,30000,40000,50000,75000,100000,125000,150000,175000,200000];
    vm.prices = [500,1000,1500,2000,3000,4000,5000,6000,7000,8000,9000,10000,15000,20000,30000,40000,50000,60000,70000,80000,90000,100000,150000,200000];	

	vm.viewPhotos = viewPhotos;
	vm.doSearch = doSearch;
	vm.getMake = getMake;
	vm.clearSelectedModel = clearSelectedModel;

    //Seed the Years array with the current year
	vm.years = [new Date().getFullYear()];  

    //Then push onto the Years array, the next
    //75 years in decreasing order
	for (var x = 0; x < 75; x++) {
		vm.years.push(vm.years[vm.years.length - 1] - 1);
	}

    //Get vehicle makes to populate the dropdown list
	Makes.query(function(response){
		vm.makes = response;
		for (var x=0; x < vm.makes.length; x++) {
	 	   var make = vm.makes[x];
		   vm.makesMap[make.id] = x;
	    }

	    console.log(vm.makes);
	    console.log(vm.makesMap);
	});


	function getMake(id) {
		return vm.makes[vm.makesMap[id]];
	}

    function doSearch() {
    	vm.results = Cars.search({make: 'honda'});
    }


	function viewPhotos(car) {

	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: 'allPhotos.html',
	      controller: 'allPhotosModalCtrl',
	      controllerAs: 'vm',
	      size: 'lg',
	      resolve: {
	        car: function () {
	          return car;
	        }
	      }
	    });

	}; 

	function clearSelectedModel(item, model)  {
		vm.terms.model = undefined;
	}

    //Save the search criteria in the SearchTerms service before
    //the controller is destroyed
	$scope.$on('$destroy', function iVeBeenDismissed() {
	  SearchTerms.set(vm.terms);
	});	
}

function allPhotosModalCtrl($rootScope, $scope, $uibModalInstance, car) {
	var vm = this;

	vm.car = car;

	  vm.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };	

}



