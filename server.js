var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个靓仔发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    /*console.log调试大法：console.log("path："+path)*/

    if (path === '/') {
        response.statusCode = 200 /*设置响应码*/
        response.setHeader('Content-Type', 'text/html;charset=utf-8') /*设置响应头*/
        response.write(`<link rel="stylesheet" href="/style.css">
        <h1>你就是最靓的仔</h1>`) /*设置响应体，可以追加内容*/
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8') /*不需要“.”机器也可以读懂*/
        response.write(`h1{color: red}`)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你访问的页面不存在`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请在空中跳水然后挥舞你的旗帜 http://localhost:' + port)