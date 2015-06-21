var users = require('../lib/monk').get('users');

module.exports = function validateRegistration(req, res, next){
    // Check if username or email is already registered
    users.findOne({'username':req.body.username})
    .success(function(doc){
        if(doc){
            console.log(doc.username + " already registered!");
            res.render('register',{errMsg: doc.username + " already registered!", title: "Register"});
        } else {
            users.findOne({'email':req.body.email})
            .success(function(doc){
                if(doc){
                    console.log(doc.email + " already registered!");
                    res.render('register',{errMsg: doc.email + " already registered!", title: "Register"});
                } else {
                    next(); // user validated and can be inserted
                }
            }); 
        }
    });
}

