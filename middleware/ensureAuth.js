module.exports = function ensureAuth(req, res, next){
    if(!req.user){
        res.status(403).send('You are not currently logged in');
    } else{
        next();
    }
}