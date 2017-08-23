angular.module('autoz')
.service('Config', Config)
.service('Search', Search)
.service('Format', Format)
.service('Enum', Enum)
.service('PopupSelection', PopupSelection)
.service('Photos', Photos)
;

function Config() {
   // this.apiRoot = 'http://webhost2:9001/api';
   // this.photoRoot = 'http://webhost2:9001';
   this.apiRoot = 'http://67.166.5.46:9001/api';
   this.photoRoot = 'http://67.166.5.46:9001';
}


function Search(Enum, Makes, Cars, blockUI, $timeout) {
   var search = this;
   search.options = [];
   search.terms = {};
   search.results = [];

   search.getParams = getParams;
   search.doSearch = doSearch;
   search.setModels = setModels;
   search.clearModels = clearModels;
   search.quickSearch = quickSearch;

   Makes.query().$promise
      .then(function(response) {
         search.makes = response;
         search.options.make.values = search.makes.map(function(make){
            return make.displayName;
         })
      });

   search.options = {
      "make": {
         title: "Make",
         values: undefined,
         selection: undefined
      },
      "model": {
         title: "Model",
        // key: "model",
         values: undefined,
         selection: undefined
      },
      "minYear": {
         title: "Min Year",
         //key: "minYear",
         values: Enum.years,
         selection: undefined
      },
      "maxYear": {
         title: "Max Year",
         //key: "maxYear",
         values: Enum.years,
         selection: undefined
      },
      "maxMiles": {
         title: "Max Mileage",
         //key: "maxMiles",
         values: Enum.mileages,
         format: "number",
         selection: undefined
      },
      "minPrice": {
         title: "Min Price",
         //key: "minPrice",
         values: Enum.prices,
         format: "currency",
         selection: undefined
      }, 
      "maxPrice": {
         title: "Max Price",
         //key: "maxPrice",
         values: Enum.prices,
         format: "currency",
         selection: undefined
      }                              
   };   

   function setModels(makeDisplayName) {
       search.options.model.selection = undefined;
       angular.forEach(search.makes, function(make){
           if (makeDisplayName == make.displayName) {
               search.options.model.values = make.models;
           }
       });
   }

   function clearModels() {
       search.options.model.selection = undefined;
       search.options.model.values = undefined;
   }   

   function getParams() {
      var params = {};

      angular.forEach(search.options, function(option, key){
         if (option.selection) {
             params[key] = option.selection;
         }
      });
      return params;
   }

   function doSearch() {
        
        blockUI.start("Finding Cars...");

        $timeout(function(){
            Cars.search({params: search.getParams()}).$promise
             .then(function(response){
                blockUI.stop();              
                search.results.splice(0, search.results.length);
                angular.forEach(response, function(car){
                  search.results.push(car);
                });
             });          
        }, 500);
   }
    
   function quickSearch(makeDisplayName) {
       search.setModels(makeDisplayName);
       angular.forEach(search.options, function(option, key){
           option.selection = undefined;
       });
       search.options.make.selection = makeDisplayName;
       search.doSearch();
   }

}

function Format($filter) {
   this.number = number;
   this.currency = currency;

   function number(value) {
      return $filter('number')(value, 0);
   }

   function currency(value) {
      return $filter('currency')(value, '$', 0);
   }   
}

function Enum() {
   this.mileages = [1000,5000,10000,20000,30000,40000,50000,75000,100000,125000,150000,175000,200000];
   
   this.prices = [500,1000,1500,2000,3000,4000,5000,6000,7000,8000,9000,10000,15000,20000,30000,40000,50000,60000,70000,80000,90000,100000,150000,200000];

   this.years = [new Date().getFullYear()];  
   for (var x = 0; x < 75; x++) {
      this.years.push(this.years[this.years.length - 1] - 1);
   }       

}

function PopupSelection($uibModal) {
   $ctrl = this;

   $ctrl.open = open;

   function open(title, items, format, callback) {
       var modalInstance = $uibModal.open({
         animation: true,
         ariaLabelledBy: 'modal-title',
         ariaDescribedBy: 'modal-body',
         templateUrl: 'app/components/shared/selection-popup.html',
         controller: modalCtrl,
         controllerAs: '$ctrl',
         size: 'sm',
         resolve: {
           title: function() {
             return title;
           },            
           items: function () {
             return items;
           },            
           format: function () {
             return format;
           }
         }
       });  

       modalInstance.result.then(function (selectedItem) {
          if (callback) {
            callback(selectedItem);
          }
       }, function () {
          //Modal dismissed
       });           
   }



   function modalCtrl($uibModalInstance, Format, title, items, format) {
      $ctrl = this;

      $ctrl.title = title;
      $ctrl.items = items;
      $ctrl.format = format;

      $ctrl.formatted = formatted;

      function formatted(item) {
         return $ctrl.format ? Format[$ctrl.format](item) : item;
      }
       

      $ctrl.ok = function (item) {
        $uibModalInstance.close(item);
      };

      $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };      
   }

}

function Photos($uibModal) {

  var $ctrl = this;

  $ctrl.viewCarPics = viewCarPics;

   function viewCarPics(car) {
       var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'views/shared/photo-viewer.html',
         controller: modalCtrl,
         controllerAs: '$ctrl',
         size: 'lg',
         resolve: {
           car: function() {
             return car;
           }
         }
       });  

       modalInstance.result.then(function (selectedItem) {
          if (callback) {
            callback(selectedItem);
          }
       }, function () {
          //Modal dismissed
       });           
   }



   function modalCtrl($uibModalInstance, Config, car) {
      var $ctrl = this;

      $ctrl.photoRoot = Config.photoRoot;
      $ctrl.car = car;

      $ctrl.ok = function (item) {
        $uibModalInstance.close(item);
      };

      $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };      
   }
}