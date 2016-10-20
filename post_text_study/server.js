var http = require('http');
var url = require('url');

function start(route, handle) { // 服务器开始
	
	function onRequest(request, response) {
		
		var postData = "";
		var pathname = url.parse(request.url).pathname; // 请求的路由pathname
		console.log("请求的路由是：" + pathname);

		request.setEncoding("utf8"); // 设置接受数据的编码格式

		request.addListener("data", function(postDataChunk) { // data回调
			postData += postDataChunk;
			console.log("持续接包");
		});

		request.addListener("end", function() {

			route(handle, pathname, response, postData); // 接受数据结束 调用路由
		});

	}
	http.createServer(onRequest).listen(8080);
	console.log("Service has started.");
}
exports.start = start;