var express = require('express'),
    router = express.Router(),
    db = require('../lib/monk'),
    users = db.get('users'),
    posts = db.get('posts'),
    validateRegistration = require('../middleware/validateRegistration'),
    validateLogin = require('../middleware/validateLogin'),
    userSession = require('../middleware/userSession'),
    genPermalink = require('../middleware/genPermalink'),
    getMyPosts = require('../middleware/getMyPosts');

router.use(userSession);

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
router.get('/dashboard', getMyPosts, function(req, res){
    console.log('from routes\n' + req.posts);
    res.render('dashboard', 
        {
            title: req.session.user.username + "'s Dashboard",
            posts: req.posts,
            drafts: req.drafts
        }
    );
});


// Create new blog post routes
router.get('/newpost', function(req, res){
    var user = req.session.user;

    if(user){
        res.render('newPost', {title: "New Post", user: user});
    } else {
        res.redirect('/login');
    }
});

router.post('/newpost', genPermalink, function(req, res){
    var newPost = req.body;
    posts.insert(newPost)
    .error(function(err){
        if(err) throw err;
    })
    .success(function(post){
        res.send(post.author + ', new post added!\n <h1>' + post.title + '</h1>\n<p>' + post.date + '</p>\n<p>' + post.body + '</p>');
    });
});

// Logout route
router.get('/logout', function(req, res){
    var user = req.session.user;
    req.session.destroy(function(err){
        if(err) throw err;

        res.send(user.username + ' successfully logged out!');
    });
});

module.exports = router;