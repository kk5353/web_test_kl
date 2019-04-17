const config = require('./config/config');

//消息转发服务器socketIO
var httpserver = require('http').createServer('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
}
).listen(config.EMIT_port);
var io = require('socket.io')(httpserver);
var emitService = require('./system/emitService')(io);
console.log('消息转发服务：http://127.0.0.1:' + config.EMIT_port);