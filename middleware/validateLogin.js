var users = require('../lib/monk').get('users');

module.exports = function validateLogin(req, res, next){
    // Validate login
    users.findOne({'username':req.body.username})
    .success(function(user){
        if(!user){
            res.render('login',{errMsg: 'Username does not exist!', title: 'Login'});
        } else {
            if(user.password !== req.body.password){
                res.render('login',{errMsg: 'Password incorrect!', title: 'Login'});
            } else {
                req.session.user = user;
                console.log(req.session.user.username + " successfully validated!");
                next();
            }
        }
    });
}

