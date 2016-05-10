autoz.factory('Makes', ['$resource', function($resource){
   return $resource('js/json/makes.json', null, null);
}])

.factory('Inventory', ['$resource', function($resource){
   return $resource('js/json/inventory.json', null, null);
}])

;