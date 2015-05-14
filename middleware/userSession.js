var db = require('../lib/monk'),
    users = db.get('users');

module.exports = function userSession(req, res, next){
    var sess = req.session;
    
    // check if session has been initialized
    if(sess && sess.user){
        // find session user in db
        users.findOne({username: sess.user.username})
        .success(function(user){
            // refresh values for session & set res.locals
            if(user){
                console.log("There's a user!");
                req.user = user;
                delete req.user.password;
                req.session.user = user;
                res.locals.user = user;
            }
            
            next();
        });
    } else {
        next();
    }
}