var express = require('express'),
    router = express.Router();

var users = [];

router.get('/', function(req, res){
    res.status(200).send('Hello World\n');
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

router.get('/register', function(req, res){
    res.render('register', {title: "Register"});
});

router.post('/register', function(req, res){
    var newUser = req.body,
        userExists = false,
        errMsg;
    
    for(var i=0; i<users.length; i++){
        if(newUser.username == users[i].username){
            userExists = true;
            errMsg = "Username already registered: Duplicate username!";
        } else if(newUser.email == users[i].email){
            userExists = true;
            errMsg = "Email already registered: Duplicate email!";
        }
    }
    
    if(userExists){
        res.send(errMsg);
    } else{
        users.push(newUser);
        console.log(users);
        res.send('Registration successful!');
    }
    
});


module.exports = router;