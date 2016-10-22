var querystring = require("querystring"),
	fs = require("fs");


function start(response, postData) {

	console.log("开始调用start方法");
	var body = '<html>' +
	'<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {

	console.log("开始调用upload函数");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("你提交的数据是:" + querystring.parse(postData).text);
	response.end();
}

function show(response, postData) {

	console.log('开始调用show方法展示图片.');
	fs.readFile("E:/vvv/02.jpg", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/jpg"});
			response.write(file, "binary");
			response.end();
		}		
	})
}

exports.start = start;
exports.upload = upload;
exports.show = show;