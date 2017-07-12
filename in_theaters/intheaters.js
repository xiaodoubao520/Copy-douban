(function(angular){
	angular
		.module("moviecat.intheaters", [])
		.config(["$routeProvider", function($routeProvider){
			$routeProvider
				.when("/in_theaters", {
					templateUrl: "./in_theaters/view.html",
					controller: "inTheater"
				})
		}])
		.controller('inTheater', ['$scope', function($scope){
			
		}])

})(angular)