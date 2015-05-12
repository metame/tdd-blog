var users = require('../lib/monk').get('users');

module.exports = function validateLogin(req, res, next){
    // Validate login
    users.findOne({'username':req.body.username})
    .success(function(doc){
        if(!doc){
            res.send('Username does not exist!');
        } else {
            if(doc.password !== req.body.password){
                res.send('Password incorrect!');
            } else {
                console.log(req.body.username + " successfully validated!");
                next();
            }
        }
    });
}

