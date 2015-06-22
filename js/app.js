var app = angular.module('app-web', [
	'ngRoute','ngCookies'
]);


app.factory('queryPortada', function($rootScope, $http, $q) {
	var deferred = $q.defer();
	$http.get('rest/query')
	.success(function(data, status, headers, config) {
		$rootScope.series = data;
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
		.when("/listado/:UserID", {
			templateUrl: partial + "partiallistado.html",
			controller: "ControladorListado"
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

	$scope.addtoList = function{
		//A IMPLEMENTAR
	};

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

app.controller("ControladorListado",['$scope','$http','$routeParams', '$route',function($scope, $http, $routeParams, $route){
	var usercode =  {keyserie: $routeParams.UserID};
	$http.post('/rest/list', usercode)
	.success(function(data, status, headers, config) {
		$scope.listado = data;
	});
	
}]);
