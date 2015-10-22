var Router = function() {

    var stack = [];

    var routes = {
        'GET': {},
        'POST': {},
        'PUT': {},
        'DELETE': {}
    }

    /**
     * Define a new GET route
     */
    this.get = function(url, fnc) {
        routes['GET'][ stack.join('') + url ] = fnc;
    }

    /**
     * Define a new POST route
     */
    this.post = function(url, fnc) {
        routes['POST'][ stack.join('') + url ] = fnc;
    }

    /*
     * Define a new PUT route
     */
    this.put = function(url, fnc) {
        routes['PUT'][ stack.join('') + url ] = fnc;
    }

    /*
     * Define a new DELETE route
     */
    this.delete = function(url, fnc) {
        routes['DELETE'][ stack.join('') + url ] = fnc;
    }

    /*
     * Define a group
     */
    this.group = function(params, fnc) {
        stack.push(params.prefix);
        fnc();
        stack.pop();
    }

    /*
     * Returns the content of a route
     */
    this.run = function(method, url, request, response) {
        if(routes[method] && routes[method][url])
                return routes[method][url](request, response);
        return null;
    }

    /*
     * Handle the request and the response
     */
    this.handle = function(request, response) {
        var content = this.run(request.method, request.url, request, response);

        if(content)
            this.respond(response, content);
        else
            this.routeNotFound(request, response);
    }

    /*
     * Write the content to the response
     */
    this.respond = function(response, content) {
        if(typeof content === 'string' || content instanceof String) {
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.end(content);
        } else {
            response.writeHead(200, {'content-type': 'text/json'});
            response.end(JSON.stringify(content));
        }
    }

    /*
     * When a route is not found, this method is called
     */
     this.routeNotFound = function(request, response) {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("404 Not Found\n");
     }

}

module.exports = new Router;