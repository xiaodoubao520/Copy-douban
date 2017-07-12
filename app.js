(function (angular) {
	angular
		.module("moviecat", [
				//在主模块中引入ngRoute之后，下面的所有的子模块都可以引用
				"ngRoute",
				"moviecat.homepage",
				"moviecat.intheaters",
				"moviecat.comingsoon",
				"moviecat.top250",
			])
		.config(["$locationProvider", function($locationProvider){
			//去掉hash路由的前缀！
			$locationProvider.hashPrefix("")
		}])
})(angular);