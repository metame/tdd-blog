var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = process.env.PORT || 8080,
    path = require('path'),
    bodyParser = require('body-parser');
    routes = require('./routes/index');
    
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(bodyParser.urlencoded({extended: false}));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// load routes
app.use('/', routes);

// start up http server
server.listen(port, function(){
    console.log("Server listening at port %s", port);
});
