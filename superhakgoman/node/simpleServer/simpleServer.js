//sample code from http://www.nextree.co.kr/p8574/
var http = require('http');
http.createServer(function (req, resp) {
    resp.writeHead(200, {'Content-Type' : 'text/plain'});
    resp.write('Hello World');
    resp.end();
}).listen(8888);

//run and connect to localhost:8888
