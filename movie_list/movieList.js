(function(angular){
    angular
        .module('moviecat.movielist', [])
        .config(['$routeProvider', function($routeProvider){
            $routeProvider
                .when('/:movieType/:page?', {
                    templateUrl: "./movie_list/view.html",
                    controller: 'movieList'
                })
        }])
        .controller('movieList', ["$scope","$route", "$routeParams", "$window", "jsonpService", function($scope, $route, $routeParams, $window, jsonpService){
            //1. 获取当前页码
            var page = $routeParams.page || 1;
            var count = 10;
            var start = count * (page - 1);

            //1.1 获取当前请求的接口
            var movieType = $routeParams.movieType;
            //2. jsonp发送请求获取数据
            var url = "https://api.douban.com/v2/movie/" + movieType + "?start=" + start + "&count=" + count;

            jsonpService.jsonp(url, function(data){
                //获取到数据之后直接将数据渲染即可
                //$scope
				$scope.data = data;
				$scope.totalPage = Math.ceil(data.total / data.count);
				$scope.currentPage = (data.start / data.count) + 1;
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

				$scope.$digest();
            });
        }])
})(angular)   