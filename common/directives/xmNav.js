(function(angular){
    angular
        .module("moviecat.directives", [])
        .directive("xmNav", ["$location", function($location){
            return {
                templateUrl: "/common/directives/xmNav.html",
                link: function(scope, element, attr){
                    scope.$location = $location;

                    scope.$watch("$location.url()",function(newValue, oldValue){
                        var lis = element.find("li");

                        //排他操作
                        for(var i = 0; i < lis.length; i++){
                            lis.eq(i).removeClass("active");
                        }

                        for(var i = 0; i < lis.length; i ++){
                            var li = lis.eq(i);
                            var a = li.find("a");
                            //如果当前li中的a标签的连接是当前页面的连接
                            //就将当前的li加上active
                            if(a.attr("href").indexOf(newValue) != -1){
                                li.addClass("active");
                            }
                        }
                    })
                    
                }
            }
        }])
})(angular)