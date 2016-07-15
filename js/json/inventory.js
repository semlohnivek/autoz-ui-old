function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function car(id, make, model, year, price, vin, miles, transmission, photos) {
	this.make = make;
	this.model = model;
	this.year = year;
	this.price = price;
	this.vin = vin;
	this.miles = miles;
	this.transmission = transmission;
	this.photos = photos;
}

var inventory = [
   new car(1, "bmw", "3 Series", 2010, 10000, "WBAE123423KM234", 94392, "Automatic", [	"1_0.jpg","1_1.jpg" ]),
   new car(2, "bmw", "3 Series", 2005, 6560, "WBA545647KM233", 153653, "Manual", [ "2_0.jpg","2_1.jpg","2_2.jpg","2_3.jpg","2_4.jpg","2_5.jpg","2_0.jpg","2_1.jpg","2_2.jpg","2_3.jpg","2_4.jpg","2_5.jpg" ]),   
   new car(3, "honda", "civic", 2012, 10000, "HN44568784YY5", 123123, "Automatic", []),
   new car(4, "honda", "civic", 2014, 22445, "HN4423465345", 6544, "Automatic", []),
   new car(5, "honda", "accord", 2009, 15400, "HN4465445645", 23423, "Manual", []),
   new car(6, "honda", "accord", 2016, 32999, "HN45678776435", 56756, "Automatic", []),
]

var criteria = JSON.parse(getParameterByName("criteria"));

var results = inventory;

for (var term in criteria) {

	switch(term) {
		case 'minyear':
		case 'minprice':
		   results = results.filter(function(car){
		   	   return +criteria[term] <= +car[term.slice(3)];
		   })			
		   break;
		case 'maxyear':
		case 'maxprice':
		case 'maxmiles':
		   results = results.filter(function(car){
		   	   return +criteria[term] >= +car[term.slice(3)];
		   })			
		   break;
		default:
		   results = results.filter(function(car){
		   	   return criteria[term].toLowerCase() == car[term].toLowerCase();
		   })		   
	}


}

console.log(criteria);

console.log(results);

document.write(JSON.stringify(results));
