(function(angular){
	angular
		.module("moviecat.top250", [])
		.config(["$routeProvider", function($routeProvider){
			$routeProvider
				.when("/top250", {
					templateUrl: "./top250/view.html",
					controller: "top"
				})
		}])
		.controller('top', ['$scope', function($scope){
			
		}])

})(angular)