(function (angular) {
	angular
		.module("moviecat.intheaters", [])
		.config(["$routeProvider", function ($routeProvider) {
			$routeProvider
				.when("/in_theaters/:page?", {
					templateUrl: "./in_theaters/view.html",
					controller: "inTheater"
				})
		}])
		.controller('inTheater', ['$scope', '$http', '$window', '$sce', "jsonpService", '$routeParams', '$route', function ($scope, $http, $window, $sce, jsonpService , $routeParams, $route) {

			//获取用户传进来的参数，要请求的是第几页的数据
			//start = count * (currentPate - 1)
			//currentPage = start / count + 1;
			var page = $routeParams.page || 1;
			var count = 10;
			var start = count * (page - 1);

			//1. 控制器一被加载，我们就需要去服务器获取数据
			//获取数据，要通过ajax请求，需要使用$http服务，所以上面需要通过注入的方式将$http服务引入当前控制器中

			//语法
			//$http(配置对象)

			//配置对象中的属性
			//1. method  请求的方式
			//2. url   	 请求的地址


			//在angular当中直接发送jsonp请求时
			//需要对url地址做信任操作！ 通过调用$sce服务的 trustAsResourceUrl
			//使用$http.jsonp的时候才需要做信任操作！！！
			var url = $sce.trustAsResourceUrl("https://api.douban.com/v2/movie/in_theaters?start="+ start +"&count="+ count);


			jsonpService.jsonp(url, function(data){
				//渲染数据
				$scope.data = data;

				//使用当前起始的索引和每页展示的个数，总数据个数
				//计算当前多少页，一共有多少页
				$scope.totalPage = Math.ceil(data.total / data.count);

				//start = count * (currentPate - 1)
				//currentPage = start / count + 1;

				$scope.currentPage = (data.start / data.count) + 1;
				// start 10 --  count 10

				//由于当前的内容不属于angular本身，所以这些代码并不能自动触发脏检测机制，所以需要手动触发


				//上一页点击事件
				$scope.prevPage = function(){

					if($scope.currentPage == 1){
						return;
					}

					//更改当前页面的连接（hash值）

					//$route.updateParams()方法可以用来更改参数的值
					$route.updateParams({
						page: $scope.currentPage - 1
					})
				}

				//下一页点击事件
				$scope.nextPage = function(){
					//更改当前页面的连接（hash值）
					if($scope.currentPage == $scope.totalPage){
						return;
					}

					//更改当前页面的连接（hash值）

					//$route.updateParams()方法可以用来更改参数的值
					$route.updateParams({
						page: $scope.currentPage + 1
					})
				}

				$scope.$digest();
				// $scope.$apply();
			})
			//由于$http.jsonp最终生成callback函数的名称，里面有.  是angular.callbacks._0
			//豆瓣的api接口中，不允许callback函数名 要求为callback只能包含数字、字母、下划线，长度不大于50
			//所以 $http.jsonp在当前项目中不能使用！
			// $http.jsonp(url)
			// .then(function(data){
			// 	console.log(data);
			// })


			// $http({
			// 	method: "GET",
			// 	url: "/in_theaters/data.json"
			// }).then(function (data) {
			// 	//将获取下来的数据，直接存放到数据模型当中$scope
			// 	//这样在视图中，就直接可以通过ng指令，做数据绑定
			// 	$scope.data = data.data;
			// 	console.log(data.data);

			// 	var Math = $window.Math;

			// 	//使用当前起始的索引和每页展示的个数，总数据个数
			// 	//计算当前多少页，一共有多少页
			// 	$scope.totalPage = Math.ceil(data.data.total / data.data.count);

			// 	//start = count * (currentPate - 1)
			// 	//currentPage = start / count + 1;

			// 	$scope.currentPage = ($scope.data.start / $scope.data.count) + 1;
			// 	// start 10 --  count 10
			// }, function () { });
		}])

})(angular)