(function(angular){
	angular
		.module("moviecat.homepage", [])
		.config(["$routeProvider", function($routeProvider){
			$routeProvider
				.when("/home_page", {
					templateUrl: "./home_page/view.html",
					controller: "homePage"
				})
		}])
		.controller('homePage', ['$scope', function($scope){
			
		}])

})(angular)