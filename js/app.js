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
			templateUrl: partial + "partialmain.html",
			controller: "ControladorPortada"
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
		.when("/noticias", {
			templateUrl: partial + "partialnoticias.html"
		})
		.when("/signup", {
			templateUrl: partial + "partialsignup.html",
			controller: "ControladorSignUp"
		})
		.otherwise({ redirectTo: "/index" });
	}]);

app.controller("ControladorMain",['$scope',function($scope){
	$scope.tab = 1;
	$scope.selectTab = function (setTab){
		$scope.tab = setTab;
	};
	$scope.isSelected = function(checkTab){
		return $scope.tab === checkTab;
	};
}]);

app.controller("ControladorPortada",['$scope',function($scope){
$scope.series = [{Title: 'Full Metal Alchemist', Poster: "full-metal.jpg", Type:"TV", Plot: "Fullmetal Alchemist (鋼の錬金術師 Hagane no Renkinjutsushi?, lit. «el alquimista de acero», también conocida como Full Metal Alchemist, FMA o Hagaren, abreviatura en japonés)"},
                  {Title: 'Arslan Senki: The Heroic Legend of Arslan', Poster: "arslan.jpg", Type:"TV", Plot:"Esta es la historia de los viajes del Príncipe Arislan, el heredero al imperio de Palse. Al principio, Palse y los Lusitanos están en guerra. Mediante la traición, el Reino de Palse cae derrotado por los Lusitanos. "},
									{Title: 'One piece', Poster:"onepiece.jpg",Type:"TV", Plot:"La serie habla sobre un chico llamado Monkey D. Luffy, en su niñez obtuvo poderes elásticos al comer una Akuma no mi (Fruta del Diablo ). Inspirado por su amigo el pirata Shanks comienza un viaje para alcanzar su sueño: ser el Rey de los Piratas. Ahora recorre los mares con el sueño de atravesar el Grand Line, un mar peligroso y desconocido donde Gol D. Roger (difunto rey de los piratas) escondió el One Piece, un tesoro de proporciones inimaginables y que ha sido por décadas la aspiración de los más poderosos y peligrosos piratas entre quienes hasta el momento ninguno ha logrado obtener"}
									];
}]);
