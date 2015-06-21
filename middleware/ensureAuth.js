module.exports = function ensureAuth(req, res, next){
    if(!req.user){
        res.status(403).redirect('/login');
    } else{
        next();
    }
}