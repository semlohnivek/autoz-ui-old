angular.module('autoz')
.service('Config', Config)
.service('SearchTerms', SearchTerms)
;

function Config() {
   this.apiRoot = 'http://webhost2:9001/api';
}

function SearchTerms() {
   this.terms = {};
   this.get = get;
   this.set = set;

   function get() {
   	   return angular.copy(this.terms);
   }

   function set(terms) {
   	   this.terms = terms;
   }   
}