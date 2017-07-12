(function(angular){
	angular
		.module("moviecat.top250", [])
		.config(["$routeProvider", function($routeProvider){
			$routeProvider
				.when("/top250/:page?", {
					templateUrl: "./top250/view.html",
					controller: "top"
				})
		}])
		.controller('top', ['$scope', 'jsonpService', '$routeParams', '$window', '$route', function($scope, jsonpService, $routeParams, $window, $route){
			
			var page = $routeParams.page || 1;
			var count = 10;
			var start = count * (page - 1);

			//1. 先请求数据
			var url = "https://api.douban.com/v2/movie/top250?start=" + start +"&count=" + count;
			jsonpService.jsonp(url, function(data){
				$scope.data = data;
				$scope.currentPage = (data.start / data.count) + 1;
				$scope.totalPage = $window.Math.ceil(data.total / count);
				$scope.$apply();
			})

			$scope.prevPage = function(){
				if($scope.currentPage == 1){
					return;
				}

				$route.updateParams({
					page: $scope.currentPage - 1
				})
			}

			$scope.nextPage = function(){
				if($scope.currentPage == $scope.totalPage){
					return;
				}

				$route.updateParams({
					page: $scope.currentPage + 1
				})
			}
		}])

})(angular)