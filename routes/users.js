var express = require('express'),
    router = express.Router(),
    db = require('../lib/monk'),
    users = db.get('users'),
    posts = db.get('posts'),
    validateRegistration = require('../middleware/validateRegistration'),
    validateLogin = require('../middleware/validateLogin'),
    userSession = require('../middleware/userSession'),
    ensureAuth = require('../middleware/ensureAuth'),
    genPermalink = require('../middleware/genPermalink'),
    getMyPosts = require('../middleware/getMyPosts'),
    getMyDrafts = require('../middleware/getMyDrafts'),
    cleanTags = require('../middleware/cleanTags'),
    addTagsToDb = require('../middleware/addTagsToDb');

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
    users
        .insert({"username":newUser.username,"password":newUser.password,"email":newUser.email})
        .error(function(err){
            if(err) throw err;
        })
        .success(function(doc){
            console.log(doc.username + " registered!");
            res.render('userMsg', {message: 'You registered successfully with username ' + doc.username + ' and email ' + doc.email});
        });
         
});

// Login routes
router.get('/login', function(req, res){
    if(!req.user){
        res.render('login', {title: "Login"});
    } else {
        res.redirect('./dashboard');
    }
});

router.post('/login', validateLogin, function(req, res){
    res.redirect('./dashboard');
});

// User Dashboard routes
router.get('/dashboard', ensureAuth, getMyPosts, getMyDrafts, function(req, res){
    res.render('dashboard', 
        {
            title: req.session.user.username + "'s Dashboard",
            posts: req.posts,
            drafts: req.drafts
        }
    );
});

// Logout route
router.get('/logout', ensureAuth, function(req, res){
    var user = req.session.user;
    req.session.destroy(function(err){
        if(err) throw err;

        res.render('userMsg',{message: user.username + ' successfully logged out!'});
    });
});

// Create new blog post routes
router.get('/newpost', ensureAuth, function(req, res){
    var user = req.session.user;

    if(user){
        res.render('newPost', {title: "New Post", user: user});
    } else {
        res.redirect('/login');
    }
});

router.post('/newpost', ensureAuth, genPermalink, cleanTags, addTagsToDb, function(req, res){
    var newPost = req.body;
    
    posts
        .insert(newPost)
        .error(function(err){
            if(err) throw err;
        })
        .success(function(post){
            res.redirect('/dashboard');
        });
});

router.get('/edit/:permalink', ensureAuth, function(req, res){

    posts.findOne({'permalink': req.params.permalink})
        .error(function(err){
            if(err) throw err;
        })
        .success(function(post){
            if(!post){
                res.status(404).render('userMsg', {message: "No post found!"});
            } else if(post.author !== req.user.username){
                res.status(403).render('userMsg', {message: "Only the author can edit a post!"});
            } else {
                res.render('editPost', {title: 'Edit Post', post: post});
            }
    });
    
});

router.post('/edit/:permalink', ensureAuth, genPermalink, cleanTags, addTagsToDb, function(req, res){
    var editedPost = req.body;
    
    posts.findAndModify({'permalink': req.params.permalink}, editedPost)
        .error(function(err){
            if(err) throw err;
        })
        .success(function(post){
            res.redirect('/dashboard');
    });
    
});




module.exports = router;