angular.module('autoz')
.factory('Makes', Makes)
.factory('Cars', Cars)
;

function Makes($resource, Config){
   return $resource(Config.apiRoot + '/makes', null, null);
}

function Cars($resource, Config){
   return $resource(Config.apiRoot + '/cars/:id/:search',
   	                {id: '@id'},
   	                {
   	                	'search': {method: 'GET', isArray: true, params: {search: 'search'}}
   	                });
}