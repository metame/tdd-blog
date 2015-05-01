var express = require('express'),
    router = express.Router();

router.get('/', function(req, res){
    res.status(200).send('Hello World\n');
});

router.get('/login', function(req, res){
    res.render('login', {title: "Login"});
});

router.post('/login', function(req, res){
    var testUser = {"username": "test","password": "test"};
    
    if(testUser.username === req.body.username){
        if(testUser.password === req.body.password){
            console.log("User " + req.body.username + " authenticated");
            res.send('Login successful');
        } else{
            console.log("Wrong password");
            res.send('Wrong password');
        }
    } else{
        console.log("Wrong username");
        res.send('Wrong username');
    }
});

module.exports = router;