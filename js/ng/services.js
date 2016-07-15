angular.module('autoz')
.service('Config', Config)
.service('SearchTerms', SearchTerms)
.service('Enum', Enum)
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

function Enum() {
   this.mileages = [1000,5000,10000,20000,30000,40000,50000,75000,100000,125000,150000,175000,200000];
   
   this.prices = [500,1000,1500,2000,3000,4000,5000,6000,7000,8000,9000,10000,15000,20000,30000,40000,50000,60000,70000,80000,90000,100000,150000,200000];

   this.years = [new Date().getFullYear()];  
   for (var x = 0; x < 75; x++) {
      this.years.push(this.years[this.years.length - 1] - 1);
   }       

}