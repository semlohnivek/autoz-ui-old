angular.module('autoz')
.directive('autozTopNav', autozTopNav)
.directive('autozInfoCube', autozInfoCube)
;

function autozTopNav(){
	// Runs during compile
	return {
		templateUrl: 'views/shared/top-nav.html',
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	}
}

function autozInfoCube(){
	// Runs during compile
	return {
		scope: {
			details: '='
		}, 
	    restrict: 'E', 
		templateUrl: 'views/shared/info-cube.html',
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	}
}