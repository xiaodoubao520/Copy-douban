(function (angular) {
	angular
		.module("moviecat", [
				//在主模块中引入ngRoute之后，下面的所有的子模块都可以引用
				"ngRoute",
				"common.jsonp",
				"moviecat.homepage",
				"moviecat.movielist"
			])
		.config(["$locationProvider", function($locationProvider){
			//去掉hash路由的前缀！
			$locationProvider.hashPrefix("")
		}])
})(angular);