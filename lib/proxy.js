/**
 * @module proxy
 * 
 * 代理模块
 */

var url = require('url');
var http = require('http');

module.exports = function proxy(req, res) {
	// 获取url，method等参数
	var params = url.parse(req.url, true).query;
	var proxyUrl = params.url;
	var method = (params.method || 'get').toLocaleUpperCase();

	// url不存在 返回''
	if (!proxyUrl) {
		return res.end('');
	}

	// 设置response header
	res.writeHead(200, { 'Content-Type': 'text/plain' });

	// 处理url
	// 没有http://的 => 添加http://
	// https => http
	// url string => url Object
	proxyUrl = url.parse(/^http[s]?:\/\/.+/.test(proxyUrl) 
		? proxyUrl.replace('https', 'http')
		: 'http://' + proxyUrl);

	// 设置http.request配置
	var option = {
		hostname: proxyUrl.host,
		port: 80,
		path: proxyUrl.path,
		method: method
	};

	// 发送请求
	var request = http.request(option, function(proxyRes) {
		// 根据请求结果 设置response header
		var statusCode = proxyRes.statusCode;
		var contentType = proxyRes.headers['content-type'];

		res.writeHead(statusCode, { 'Content-Type': contentType });
		
		proxyRes.setEncoding('utf8');

		var str = '';
		proxyRes.on('data', function(chunk) {
			str += chunk;
		});
		
		proxyRes.on('end', function() {
			res.end(str);
		});
	});

	request.on('error', function (err) {
		res.end(err.message);
	});

	// 发送请求
	request.write(JSON.stringify({ 'msg': params.msg || ''}));

	res.on('error', function(err) {
		res.end(err.message);
	});
};