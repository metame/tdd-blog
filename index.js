var server = require('http').createServer(function(req, res){
    res.writeHead(200, {"Content-Type":"text/plain"});
    res.end('Hello World\n');
});

server.listen(8080, function(){
    console.log("Server listening at port 8080");
});
