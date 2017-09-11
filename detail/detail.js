(function(angular){
    angular
        .module("moviecat.detail", [])
        .config(["$routeProvider", function($routeProvider){
            $routeProvider
                .when("/details/:id", {
                    templateUrl: "/detail/view.html",
                    controller: "detail"
                })
        }])
        .controller("detail", ["$scope", "$routeParams", "jsonpService", function($scope, $routeParams, jsonpService){
            var id = $routeParams.id;
            var url = "https://api.douban.com/v2/movie/subject/" + id +"?";
            //向接口发送请求获取电影的详细信息
            jsonpService.jsonp(url, function(data){
                $scope.data = data;
                $scope.$digest();
            })
        }])
})(angular)