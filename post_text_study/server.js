var http = require('http');
var url = require('url');

function start(route, handle) { // 服务器开始
	
	function onRequest(request, response) {
		
		var pathname = url.parse(request.url).pathname; // 请求的路由pathname
		console.log("请求的路由是：" + pathname);
		route(handle, pathname, response, request);


	}
	http.createServer(onRequest).listen(8080);
	console.log("Service has started for part 8080.");
}
exports.start = start;