var http = require('http');
var Router = require('../http/Router');

var Application = function() {

    var server = null;
    var paths = null;

    this.setPaths = function(newPaths) {
    	paths = newPaths;
    }

    this.getPaths = function() {
    	return paths;
    }

    this.defineRoutes = function() {
    	require(paths.routes);
    }

    this.run = function() {
    	this.defineRoutes();
    	
        server = http.createServer(function(request, response) {
            Router.handle(request, response);
        }).listen(8080);
    }

}

module.exports = new Application;