var users = require('../lib/monk').get('users');

module.exports = function validateLogin(req, res, next){
    // Validate login
    users.findOne({'username':req.body.username})
    .success(function(user){
        if(!user){
            res.send('Username does not exist!');
        } else {
            if(user.password !== req.body.password){
                res.send('Password incorrect!');
            } else {
                req.session.user = user;
                console.log(req.session.user.username + " successfully validated!");
                next();
            }
        }
    });
}

