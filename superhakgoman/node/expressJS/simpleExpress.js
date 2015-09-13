var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

function onListen(){
    console.log('Express server running : ' + server.address().toString());
}
function onRequest(request, resp){
    console.log('Server got Request : ' + request);
    // console.log(request);
    resp.send('Hello');
    function createObj(name, value, number){
        this.name = name;
        this.value = value;
        this.number = number;
    }
    var o = new createObj(1,2,3);
    // console.log(o.toSource());
}
server.listen(25252, onListen);
app.get('/', onRequest);
app.get('/tt.html', onRequest);
