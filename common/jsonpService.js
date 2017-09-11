(function (angular) {
    angular
    .module("common.jsonp", [])
    .service("jsonpService", ["$window", function ($window) {

            // var $ = angular.element;
            //按照之前讲解的jsonp的封装原理进行操作

            //服务器端返回来的jsonp数据是一个函数调用的形式
            //     callback名称(数据对象)

            //因为使用script标签的src属性发送的请求，所以最终请求下来的内容会被当做js代码来执行
            //所以服务器端返回的  callback名称(数据对象) 会被当做js代码直接执行

            //只要能够在全局生成一个 callback名称 这个函数，那么就可以成功调用，也就类似于是一个成功之后的回调函数

            //url: 请求的连接
            //callback： 请求成功之后的回调函数
            this.jsonp = function (url, callback) {

                //这里用户传进来的callback是需要在请求成功之后被调用的
                //是被返回来的  callback名称(数据对象) 代码调用的 
                //由于这句代码是在全局执行的，所有我们需要将用户传进来的callback存到全局去，以备调用

                //但是由于同时可能存在多个jsonp请求，也就有多个callback函数
                //那么不能用固定的名称进行存储，因为这样会发生覆盖
                //所以就为每一个函数单独生成一个独一无二的函数名，存到全局对象中

                var cbName = "jsonp" + (new Date() - 0) + $window.parseInt($window.Math.random() * 10000);
                $window[cbName] = callback;

                //因为随机生成函数名后台并不知道，但是后台需要返回调用该函数的代码
                //所以我们需要将随机生成的函数名传递给后台

                //jsonp请求的原理，就是动态的创建script标签，通过src属性发送请求
                var script = document.createElement("script");
                script.src = url + "&callback=" + cbName;
                document.body.appendChild(script);

                // var script = $("<script src="+ url + "&callback=" + cbName  +"></script>")
                // $(document.body).append(script);
            }
        }])
})(angular)