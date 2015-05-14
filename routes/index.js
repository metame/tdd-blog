var express = require('express'),
    router = express.Router(),
    db = require('../lib/monk'),
    users = db.get('users'),
    validateRegistration = require('../middleware/validateRegistration'),
    validateLogin = require('../middleware/validateLogin'),
    userSession = require('../middleware/userSession');

router.use(userSession);

var posts = [];

// User home page
router.get('/', function(req, res){
    res.status(200).send('Hello World\n');
});

// Register Routes
router.get('/register', function(req, res){
    res.render('register', {title: "Register"});
});

router.post('/register', validateRegistration, function(req, res){
    var newUser = req.body;

    // Insert user in db & send successful response
    users.insert({"username":newUser.username,"password":newUser.password,"email":newUser.email})
    .on('error', function(err){
        console.log(err);
    })
    .on('success',function(doc){
        console.log(doc.username + " registered!");
        res.send('You registered successfully with username ' + doc.username + ' and email ' + doc.email);
    });
         
});

// Login routes
router.get('/login', function(req, res){
    res.render('login', {title: "Login"});
});

router.post('/login', validateLogin, function(req, res){
    res.send('Welcome ' + req.session.user.username + '!');
});

// User Dashboard routes
router.get('/dashboard', function(req, res){
    var user = req.session.user;
    res.render('dashboard', {title: user.username + "'s Dashboard"});
});

router.get('/newPost', function(req, res){
    res.render('newPost', {title: "New Post"});
});

router.post('/newPost', function(req, res){
    var newPost = req.body;
    posts.push(newPost);
    res.send('New post added!\n <h1>' + newPost.title + '</h1>\n<p>' + newPost.body + '</p>');
    
});

module.exports = router;