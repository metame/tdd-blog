var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = process.env.PORT || 8080,
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    userSession = require('./middleware/userSession');
    
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

// start up http server
server.listen(port, function(){
    console.log("Server listening at port %s", port);
});
