autoz.controller('homeCtrl', ['$rootScope', function($rootScope){
	
	this.carouselInterval = 5000;
	this.activeSlide = 0;
	this.slides = [
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

	this.infoCubes = [
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
}])

.controller('searchCtrl', ['$rootScope', '$scope', '$state', '$uibModal', 'Makes','Inventory', function($rootScope, $scope, $state, $uibModal, Makes, Inventory){

	// NOTE:  The 'criteria' object is defined on $rootScope so it's preserved as the user navigates
	//        throughout the site
	
	$scope.makesMap = {};
	$scope.makes = [];

	Makes.query(function(response){
		$scope.makes = response;
		for (var x=0; x < $scope.makes.length; x++) {
	 	   var make = $scope.makes[x];
		   $scope.makesMap[make.id] = x;
	    }

	console.log($scope.makes);
	console.log($scope.makesMap);	    
	});


	$scope.getMake = function(id) {
		return $scope.makes[$scope.makesMap[id]];
	}


    //Seed the Years array with the current year
	$scope.years = [new Date().getFullYear()];

    //Then push onto the Years array, the next
    //75 years in decreasing order
	for (var x = 0; x < 75; x++) {
		$scope.years.push($scope.years[$scope.years.length - 1] - 1);
	}

    //Hard-code the mileage and price options as they don't really follow a fixed pattern
    $scope.mileages = [1000,5000,10000,20000,30000,40000,50000,75000,100000,125000,150000,175000,200000];
    $scope.prices = [500,1000,1500,2000,3000,4000,5000,6000,7000,8000,9000,10000,15000,20000,30000,40000,50000,60000,70000,80000,90000,100000,150000,200000];

    $scope.search = function() {
    	$scope.results = Inventory.query();
    }


	$scope.viewPhotos = function (car) {

	    var modalInstance = $uibModal.open({
	      animation: true,
	      templateUrl: 'allPhotos.html',
	      controller: 'allPhotosModalCtrl',
	      size: 'lg',
	      resolve: {
	        car: function () {
	          return car;
	        }
	      }
	    });

	  };   


}])

.controller('allPhotosModalCtrl', ['$rootScope', '$scope', '$uibModalInstance', 'car', function($rootScope, $scope, $uibModalInstance, car){

	$scope.car = car;

	  $scope.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	  };	

}])

.controller('topNavCtrl', ['$rootScope', '$state', function($rootScope, $state){
	


}])

;