var degreeSign = "00B0";
degreeSign = String.fromCharCode(parseInt(degreeSign, 16));

var weatherDisplayOriginalNameDontSteal = angular.module('weatherDisplayOriginalNameDontSteal', []);

weatherDisplayOriginalNameDontSteal.controller('weatherControl', function($scope, $http) {
	var geoLat, geoLong, apiUrl;


	/*get coords using html5 geolocation. tofixed uses 3 decimal points e.x 44.123 which is accurate  enough for us
	  sets the values up so they can be used by angular might not need all this scope stuff but its late and i can't see the screen so good anymore'*/

	$.getJSON('http://ip-api.com/json', function(data) {
		console.log("hi", data);

	}).done(function(data) {
		geoLat = Number(data.lat).toFixed(3);
		geoLong = Number(data.lon).toFixed(3);
		console.log(geoLat, "  ", geoLong);
		apiUrl = "http://testings-calicode.c9users.io:8080/weather/latitude/" + geoLat + "/longitude/" + geoLong + "/reqtype/blah";
		apiLookup(apiUrl);

	});
	//calls the api lookup


	var apiLookup = function(apiUrl) {

		/* simple http call with promise, .then is successhandler, second function is errorhandler */

		$http.get(apiUrl).then(function(apiResults) {
			// set $scope so ng-repeat can use it
			console.log(apiResults.data);
			$scope.apiResults = apiResults.data;

		}, function(apiResults) {
			console.log("Error was");
			console.log(apiResults);
		}); //end api call

	};

}); // end controller




$(document).ready(function() {
	/* handle switching temperature types when radio buttons are clicked  */

	$('input:radio').click(function() {

		if ($(this).val() === 'C') {

			$(".weatherResult").each(function() {
				let tempTmp = $(this).text().indexOf(degreeSign)
				tempTmp = $(this).text().slice(0, tempTmp);
				tempTmp = Number(tempTmp);
				tempTmp = Math.floor((tempTmp - 32) / 1.8);
				$(this).text(tempTmp + "" + degreeSign + "C");

			});
		} else if ($(this).val() === 'F') {
			$(".weatherResult").each(function() {
				let tempTmp = $(this).text().indexOf(degreeSign)
				tempTmp = $(this).text().slice(0, tempTmp);
				tempTmp = Number(tempTmp);
				tempTmp = Math.ceil((tempTmp * 1.8) + 32);
				$(this).text(tempTmp + "" + degreeSign + "F");

			});


		}


	});

});
