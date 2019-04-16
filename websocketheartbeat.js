// npm install nodejs-websocket
const ws = require("nodejs-websocket")

console.log("开始建立链接")
let rd, obj, time, intervalObj = null
const server = ws.createServer(conn => {


    conn.
    conn.on("text", str => {
        time = new Date()
        time = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate() + "  "
            + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
        console.log(`接受到的信息为: ${str}, 接受到信息的时间为: ${time}`)
        obj = JSON.parse(str)
        // 回应浏览器发送的ping，判断链接是否已经断开
        if (obj.event === "ping") {
            conn.sendText('{"event": "pong"}')
        }
        // 订阅数据
        if (obj.event === "getData") {
            // 模拟数据一直在推送
            intervalObj = setInterval(() => {
                rd = Math.floor(Math.random(0, 10) * 100)
                conn.sendText(JSON.stringify({event: 'getData', dt: {num: rd}}))
            }, 1000)
        }
    })
    conn.on("close", function (code, reason) {
        clearInterval(intervalObj)
        console.log("Connection closed")
    })
    // 必须监控error, 每当浏览器刷新时会断开链接报错
    conn.on("error", function (error) {
        clearInterval(intervalObj)
        console.log("Connection error", error)
    })
}).listen(991);