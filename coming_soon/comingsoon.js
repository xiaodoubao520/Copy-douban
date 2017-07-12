(function(angular){
	angular
		.module("moviecat.comingsoon", [])
		.config(["$routeProvider", function($routeProvider){
			$routeProvider
				.when("/coming_soon", {
					templateUrl: "./coming_soon/view.html",
					controller: "comingSoon"
				})
		}])
		.controller('comingSoon', ['$scope', function($scope){
			
		}])
})(angular)