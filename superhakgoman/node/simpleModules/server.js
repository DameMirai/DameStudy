var http = require('http');
var url = require('url');

function onRequest(request, response){
    console.log('request comes...!');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write('Hello World');
    response.end();
}

function onConnection(socket){
    console.log('connection comes...!');
}

exports.startServer = function(route, handle){
    var server = http.createServer();
    server.addListener('connection', function(socket){
        onConnection(socket);
    });
    server.addListener('request', function(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log('request for : ' + pathname);
        route(handle, pathname, response);
        // onRequest(request, response);
    });
    server.listen(8888);
};
