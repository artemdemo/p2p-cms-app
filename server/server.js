const nodeStatic = require('node-static');
const http = require('http');
const file = new nodeStatic.Server(`${__dirname}/public`)

const server = http.createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response)
    }).resume()
}).listen(9990);

server.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
        console.log('[server.js] EADDRINUSE');
    }
});