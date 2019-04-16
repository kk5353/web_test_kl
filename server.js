const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const config = require('./config/config');
const path = require('path')
//API接口服务
var server = express();
server.listen(config.API_Port);
console.log('API接口服务：http://127.0.0.1:' + config.API_Port);
server.use('/static',express.static('static'));

//1.获取请求数据
//get自带
server.use(bodyParser.urlencoded({ extended: false }));

// server.use(multerObj.any());




var heartBeatService=require("./route/system/HeartBeatService");
var hbs =heartBeatService.getInstance(server);
timerStart(1000*100);
function  timerStart(millisecond) {
    var timerToken = setInterval(function () {
            console.log("服务端状态：" + hbs.state)
        },
        millisecond
    );
}
server.get('/heartBeatServiceTest', function (req, res) {
    hbs.state = req.query.state;
    console.log(req.query.state);
    res.end("设置完毕:"+ hbs.state);
});






//2.cookie、session
server.use(cookieParser());
(function () {
    var keys = [];
    for (var i = 0; i < 100000; i++) {
        keys[i] = 'a_' + Math.random();
    }
    server.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 20 * 60 * 1000  //20min
    }));
})();


//全局路由控制4.route
server.use('/web', require('./route/web')());
server.use('/zhuce/', require('./route/zhuce')());
server.use('/user/', require('./route/user')());
server.use('/admin/', require('./route/admin')());
server.use('/meeting/', require('./route/meeting')());
//用来展示前台页面

//文件上传下载
var upload = require('./route/file/upload')(server);
//文件下载




// //消息转发服务器socketIO
// var httpserver = require('http').createServer('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// }
// ).listen(config.EMIT_port);
// var io = require('socket.io')(httpserver);
// var emitService = require('./route/system/emitService')(io);
// console.log('消息转发服务：http://127.0.0.1:' + config.EMIT_port);




var sendpost = require('./route/system/sendrequest')(server);




