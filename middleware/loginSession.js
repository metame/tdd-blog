module.exports = function loginSession(req, res, next){
    var sess = req.session;
    
    if(!sess.user){
        sess.user = req.body.username;
        console.log("Session started for " + sess.user);
    }
    
    next();
}