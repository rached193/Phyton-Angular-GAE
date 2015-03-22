var app = angular.module('app-web', [
	'ngRoute'
]);

//Constantes
var addr = "192.168.1.2:8090";
var partial = "view/"

app.config(['$routeProvider',
	function($routeProvider){
	$routeProvider
		.when("/index", {
			templateUrl: partial + "partialmain.html"
		})
		.when("/series/:id", {
			templateUrl: partial + "partialseries.html",
			controller: "ControladorSeries"
		})
		.when("/resultado/:serieID", {
			templateUrl: partial + "partialseriesresult.html",
			controller: "ControladorResults"
		})
		.when("/opciones", {
			templateUrl: partial + "partialopciones.html"
		})
		.when("/login", {
			templateUrl: partial + "partiallogin.html"
		})
		.when("/signup", {
			templateUrl: partial + "partialsignup.html",
			controller: "ControladorSignUp"
		})
		.otherwise({ redirectTo: "/index" });
	}]);
