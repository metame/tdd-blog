var express = require('express'),
    router = express.Router(),
    db = require('../lib/monk'),
    users = db.get('users');

var posts = [];

router.get('/', function(req, res){
    res.status(200).send('Hello World\n');
});

router.get('/register', function(req, res){
    res.render('register', {title: "Register"});
});

function validateRegistration(req, res, next){
    // Check if username or email is already registered
    users.findOne({'username':req.body.username})
    .success(function(doc){
        if(doc){
            console.log(doc.username + " already registered!");
            res.send(doc.username + " already registered!");
        } else {
            users.findOne({'email':req.body.email})
            .success(function(doc){
                if(doc){
                    console.log(doc.email + " already registered!");
                    res.send(doc.email + " already registered!");
                } else {
                    next(); // user validated and can be inserted
                }
            }); 
        }
    });
}

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

router.get('/login', function(req, res){
    res.render('login', {title: "Login"});
});

router.post('/login', function(req, res){
    var thisUser;
    
    for(var i=0; i<users.length; i++){
        if(req.body.username == users[i].username){
            thisUser = users[i];
        }
    }
    
    if(!thisUser){
        console.log("Username does not exist!");
        res.send('Username does not exist!');
    } else {
        if(thisUser.username === req.body.username){
            if(thisUser.password === req.body.password){
                console.log("User " + req.body.username + " authenticated");
                res.send('Login successful!');
            } else{
                console.log("Wrong password");
                res.send('Wrong password!');
            }
        }
    }
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