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
        .controller('movieList', ["$scope", "$route", "$routeParams", "$window", "jsonpService", function($scope, $route, $routeParams, $window, jsonpService){

            //$routeParams 不仅可以获取到路由中定义的参数
            //也可以获取到用？传进来的参数！
            var keyword = $routeParams.q;

            //设置遮罩层为显示
            $scope.isMaskShow = true;

            //1. 获取当前页码
            var page = $routeParams.page || 1;
            var count = 10;
            var start = count * (page - 1);

            //1.1 获取当前请求的接口
            var movieType = $routeParams.movieType;
            //2. jsonp发送请求获取数据
            var url = "https://api.douban.com/v2/movie/" + movieType + "?start=" + start + "&count=" + count +"&q=" + keyword;

            jsonpService.jsonp(url, function(data){
                //获取到数据之后直接将数据渲染即可
                //$scope
                $scope.data = data;
                //因为数据请求已经完成，所以将这这层隐藏
                $scope.isMaskShow = false;

                //计算下面的页标需要的内容
                //总页数
                $scope.totalPage = Math.ceil(data.total / data.count);
                //当前页
                $scope.currentPage = (data.start / data.count) + 1;
                //上一页按钮的点击事件
				$scope.prevPage = function(){
					if($scope.currentPage == 1){
						return;
					}
					$route.updateParams({
						page: $scope.currentPage - 1
					})
				}

                //下一页按钮的点击事件
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