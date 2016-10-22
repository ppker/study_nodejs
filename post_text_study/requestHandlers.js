var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function start(response, postData) {

	console.log("开始调用start方法");
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {

	console.log("开始调用upload函数");

	var form = new formidable.IncomingForm(); // 实例化form
	form.uploadDir = 'tmp'; // window环境会抛出错误 好像是目录权限问题 加上此行代码 就好
	console.log("进行上传图片的数据处理");
	form.parse(request, function(error, fields, files) {
		console.log("正在进行解析图片数据");
		fs.renameSync(files.upload.path, "./tmp/00002.jpg");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("开始显示图片");
		response.write("<img src='/show' />");
		response.end();
	});
	
}

function show(response) {

	console.log('开始调用show方法展示图片.');
	fs.readFile("./tmp/00002.jpg", "binary", function(error, file) {
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