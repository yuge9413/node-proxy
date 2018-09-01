/**
 * @module server node server
 * 
 * 建立node服务
 */

var http = require('http');
var proxy = require('./lib/proxy');
var serverConfig = require('./config').server;

http.createServer(proxy).listen(serverConfig.port, serverConfig.host);