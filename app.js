(function (angular) {
	angular
		.module("moviecat", [
				//在主模块中引入ngRoute之后，下面的所有的子模块都可以引用
				"ngRoute",
				"common.jsonp",
				//路由的规则匹配，会按照路由添加的顺序，依次去匹配
				//如果在前面路由规则匹配成功了，那么就算下面有能够匹配的内容，也不会再去匹配了
				//所以我们需要将 moviecat.detail 放在前面，那么如果 是通过/details/8 这种方式进来的
				//那么路由匹配到的模块就是我们moviecat.detail 而不会是 "moviecat.movielist"
				"moviecat.detail",
				"moviecat.homepage",
				"moviecat.movielist",
				"moviecat.directives",
			])
		.config(["$locationProvider", function($locationProvider){
			//去掉hash路由的前缀！
			$locationProvider.hashPrefix("")
		}])
		.controller("search", ["$scope", "$location", "$route", function($scope, $location, $route){
			$scope.search = function(){
				//获取用户输入的关键词信息
				var keyword = $scope.keyword;
				//让页面跳转到 /search/1?q=keyword

				// var url = "/search?q=" + keyword;
				// //$location.url()方法也可以用来设置 页面的hash值
				// $location.url(url);

				// $route.updateParams({
				// 	movieType: "search",
				// 	page: 1,
				// 	q: keyword
				// })
			}
		}])
})(angular);