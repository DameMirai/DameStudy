function route(handle, pathname, response){
    console.log('about to route a request for ' + pathname);
    if (typeof handle[pathname] !== 'function') {
        console.error('no request handler function found for ' + pathname);
        handle.notFound();
        return;
    }else {
        handle[pathname](response);
    }
}

exports.route = route;
