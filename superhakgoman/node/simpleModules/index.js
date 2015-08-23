var server = require('./server');
var router = require('./router');
var requestHandler = require('./requestHandler');
server.startServer(router.route, requestHandler.handle);
// server.startServer();
