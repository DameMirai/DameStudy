function view(response){
    console.log('called : view');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write('Your request is  : ' + arguments.callee);
    response.end();
}
function create(response){
    console.log('called : create');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write('Your request is  : ' + arguments.callee);
    response.end();
}

function notFound(response){
    console.log('called : notFound');
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write('404 not found');
    response.end();
}

var handle = {
    '/' : view,
    '/view' : view,
    '/create' : create,
    '/notFound' : notFound,
};

exports.handle = handle;
