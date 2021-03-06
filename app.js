var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = process.env.PORT || 8080,
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    users = require('./routes/users'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);
    
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(bodyParser.urlencoded({extended: false}));

// session setup
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({url: 'mongodb://localhost:27017/blog'})
}));

// load routes
app.use('/', routes);
app.use('/users', users);

// start up http server
server.listen(port, function(){
    console.log("Server listening at port %s", port);
});
