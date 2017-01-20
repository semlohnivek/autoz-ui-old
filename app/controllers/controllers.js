angular.module('autoz')
.controller('topNavCtrl', topNavCtrl)
.controller('adminCtrl', adminCtrl)
.controller('homeCtrl', homeCtrl)
.controller('searchCtrl', searchCtrl)
.controller('aboutCtrl', aboutCtrl)
;

function topNavCtrl() {
	
}

function adminCtrl(Makes, Enum, Cars, FileUploader, Config) {
	var vm = this;

	vm.car = {};

	vm.addCarToInventory = addCarToInventory;
	vm.generateCar = generateCar;
	vm.generate25Cars = generate25Cars;

    //Get vehicle makes to populate the dropdown list
	Makes.query(function(response){
		vm.makes = response;
	});	

	vm.years = Enum.years;
	vm.prices = Enum.prices;
	vm.mileages = Enum.mileages;

	vm.photoRoot = Config.photoRoot;

	function addCarToInventory() {
		var car = new Cars();

        angular.copy(vm.car, car);

        //car.make = car.make.displayName;

        car.$save()
           .then(function(response){
           		console.log("SUCCESS");
           		console.log(response);
           		vm.stockId = response.stockId;
           		vm.photoUploader.uploadAll();
           		vm.car = {};
           }, function(err){
           		console.log("FAIL");
           		console.log(err);
           }); 

	}

	//For testing
	function generateCar() {

		vm.car = {};

        var makeIndex = Math.floor(Math.random() * (vm.makes.length));
        console.log(makeIndex);
		vm.car.make = vm.makes[makeIndex];

        var modelIndex = Math.floor(Math.random() * (vm.car.make.models.length));
        console.log(modelIndex);
		vm.car.model = vm.car.make.models[modelIndex];    

		vm.car.year = Math.floor(Math.random() * (vm.years[0] - 2005 + 1)) + 2005;
		vm.car.mileage = Math.floor(Math.random() * (150000 - 30000 + 1)) + 30000;
		vm.car.price = Math.floor(Math.random() * (25000 - 5000 + 1)) + 5000;
		vm.car.vin = (Math.floor(Math.random() * (900000 - 200000 + 1)) + 200000) + "FKE234MQ32N";

		vm.car.description = "This " + vm.car.year + " " + vm.car.make.displayName + " " + vm.car.model + " is truly one of a kind.  With only " + vm.car.mileage + " miles, there's still plenty of life left in this baby.  Was a non-smoking vehicle that was cared for meticulously throughout its life.  It has bucket seats, backup cam, A/C, heater, steering wheel, gas pedal, windshield, and much more.  Come take a look!";

		addCarToInventory();
	}

	function generate25Cars() {
		for (var i=0; i < 25; i++) {
			vm.generateCar();
		}
	}

	// FILE UPLOADER TESTING

        var photoUploader = vm.photoUploader = new FileUploader({
            url: 'http://webhost2:9001/upload/photos'
        });

        // FILTERS

        // photoUploader.filters.push({
        //     name: 'customFilter',
        //     fn: function(item /*{File|FileLikeObject}*/, options) {
        //         return this.queue.length < 10;
        //     }
        // });

        // CALLBACKS

        photoUploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        photoUploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            console.info('photoUploader', photoUploader);
        };
        photoUploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        photoUploader.onBeforeUploadItem = function(item) {
            item.formData.push({stockId: vm.stockId});        	
            console.info('onBeforeUploadItem', item);
        };
        photoUploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        photoUploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        photoUploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        photoUploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        photoUploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        photoUploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        photoUploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('photoUploader', photoUploader);




	// END FILE UPLOADER TESTING







}

function homeCtrl($state, Makes, Config, Search) {
	var vm = this;

	vm.photoRoot = Config.photoRoot;

	vm.search = search;
	
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

	Makes.query().$promise
	   .then(function(response){
	   	   vm.makes = response;
	   	   vm.makes = vm.makes.map(function(make){
	   	   	delete make._id;
	   	   	delete make.slogan;
	   	   	   make.term = JSON.stringify({make:make});
	   	   	   return make;
	   	   });
	   })

    function search(make) {
    	Search.quickSearch(make.displayName);
    	$state.go('search');
    }
}

function searchCtrl($rootScope, $scope, $state, $uibModal, Makes, Cars, Search, Enum, Config) {

	if ($state.params.terms) {
		Search.terms = JSON.parse($state.params.terms);
	}

	var vm = this;

	vm.makesMap = {};
	vm.makes = [];
	vm.terms = Search.terms;

    //Hard-code the mileage and price options as they don't really follow a fixed pattern
    vm.mileages = Enum.mileages;
    vm.prices = Enum.prices;
    vm.years = Enum.years;

	vm.doSearch = doSearch;
	vm.getMake = getMake;
	vm.clearSelectedModel = clearSelectedModel;

	vm.options = Search.options;

	vm.photoRoot = Config.photoRoot;

	//vm.doSearch();	

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
        vm.results = Search.doSearch();
    }


	function clearSelectedModel(item, model)  {
		vm.terms.model = undefined;
	}

    //Save the search criteria in the Search service before
    //the controller is destroyed
	$scope.$on('$destroy', function iVeBeenDismissed() {
	  Search.terms = vm.terms;
	});	
}

function aboutCtrl() {
	var $ctrl = this;

	$ctrl.message = "About information coming soon!!";
}