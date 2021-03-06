var app = angular.module('app-web', [
	'ngRoute','ngCookies'
]);





app.factory('queryPortada', function($rootScope, $http, $q) {
	var deferred = $q.defer();
	$http.get('rest/query')
	.success(function(data, status, headers, config) {
		$rootScope.series = data;
		/*
		$rootScope.series = [{Title: 'Full Metal Alchemist', Poster: "full-metal.jpg", Type:"TV", Plot: "Fullmetal Alchemist (鋼の錬金術師 Hagane no Renkinjutsushi?, lit. «el alquimista de acero», también conocida como Full Metal Alchemist, FMA o Hagaren, abreviatura en japonés)"},
											{Title: 'Arslan Senki: The Heroic Legend of Arslan', Poster: "arslan.jpg", Type:"TV", Plot:"Esta es la historia de los viajes del Príncipe Arislan, el heredero al imperio de Palse. Al principio, Palse y los Lusitanos están en guerra. Mediante la traición, el Reino de Palse cae derrotado por los Lusitanos. "},
											{Title: 'One piece', Poster:"onepiece.jpg",Type:"TV", Plot:"La serie habla sobre un chico llamado Monkey D. Luffy, en su niñez obtuvo poderes elásticos al comer una Akuma no mi (Fruta del Diablo ). Inspirado por su amigo el pirata Shanks comienza un viaje para alcanzar su sueño: ser el Rey de los Piratas. Ahora recorre los mares con el sueño de atravesar el Grand Line, un mar peligroso y desconocido donde Gol D. Roger (difunto rey de los piratas) escondió el One Piece, un tesoro de proporciones inimaginables y que ha sido por décadas la aspiración de los más poderosos y peligrosos piratas entre quienes hasta el momento ninguno ha logrado obtener"}
											];
											*/
		deferred.resolve();
	});
	return deferred.promise;
});

//Constantes
var addr = "192.168.1.2:8090";
var partial = "view/"

app.config(['$routeProvider',
	function($routeProvider){
	$routeProvider
		.when("/index", {
			templateUrl: partial + "partialmain.html",
			controller: "ControladorPortada",
			resolve    : { 'portada': 'queryPortada' }
		})
		.when("/ficha/:serieID", {
			templateUrl: partial + "partialficha.html",
			controller: "ControladorResults"
		})
		.when("/opciones", {
			templateUrl: partial + "partialopciones.html"
		})
		.when("/login", {
			templateUrl: partial + "partiallogin.html",
			controller: "ControladorLogin"
		})
		.when("/noticias", {
			templateUrl: partial + "partialnoticias.html"
		})
		.when("/signup", {
			templateUrl: partial + "partialsignupsimple.html",
			controller: "ControladorSignUp"
		})
		.when("/insertar", {
			templateUrl: partial + "partialinsertar.html",
			controller: "InsertCtrl"
		})
		.otherwise({ redirectTo: "/index" });
	}]);

app.controller("ControladorMain",['$scope','$cookies',function($scope,$cookies){
	$scope.tab = 10;

	$scope.usuario = $cookies.user;

	$scope.isLogged = function() {
		return !angular.isUndefined($cookies.user);
	};

	//Deslogeamos al usuario
	$scope.logOut = function(){
		delete $cookies["user"];
	};
	$scope.selectTab = function (setTab){
		$scope.tab = setTab;
	};
	$scope.isSelected = function(checkTab){
		return $scope.tab === checkTab;
	};
}]);

app.controller("ControladorPortada",['$scope',function($scope){
}]);


app.controller('InsertCtrl', function($scope, $rootScope, $http, $location) {

	$scope.submitInsert = function() {
		var serie = {
			id: $scope.serieid,
			title : $scope.titlea,
			poster : $scope.poster,
			typel : $scope.typel,
			plot : $scope.plot,
			episodes: $scope.episodes,
			genres: $scope.genres,
			air: $scope.air,
			status: $scope.estado,
		};
		$http.post('/rest/insert', serie)
		.success(function(data, status, headers, config) {
			$rootScope.series.push(data);
		});
		$location.path('/index');
	};

});

app.controller("ControladorResults",['$scope','$http','$routeParams', '$route',function($scope, $http, $routeParams, $route){
	var seriecode =  {keyserie: $routeParams.serieID};
	$http.post('rest/fetch',seriecode).success(function(data, status, headers, config) {
	$scope.serie = data;
	});

}]);


app.controller("ControladorSignUp", ['$scope','$http', '$location', function($scope, $http, $location){


	$scope.update = function(user){

			if (user.pass == user.repass){
				var checkuser = {
					name: $scope.user.name,
					nickname: $scope.user.surname,
					email: $scope.user.email,
					passw: $scope.user.pass,
				};
				$http.post("/rest/signup",checkuser)
					.success(function (user){
						$location.path("/index");
					})
					.error(function (){
						alert("Nombre o email ya registrado.");
					})
			}else{
				alert("Las contraseñas no coinciden");
			}
	};
}]);


app.controller("ControladorLogin", ['$scope','$http', '$location','$cookies', function($scope, $http, $location,	$cookies){


	$scope.submitLogin = function() {
		var user = {
			name: $scope.nombre,
			passw : $scope.pass,
		};
		$http.post('/rest/login', user)
		.success(function(data, status, headers, config) {
			$cookies.user = data.nickname;
			$location.path('/index');
		})
		.error(function (){
			alert("Nombre o contraseña incorrectos");
		});

	};

}]);
