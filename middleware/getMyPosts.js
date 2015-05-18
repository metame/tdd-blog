var db = require('../lib/monk'),
    posts = db.get('posts');

module.exports = function getMyPosts(req, res, next){
    var user = req.session.user;
    
    // Find all posts by logged in user
    posts
    .find({'author':user.username})
    .error(function(err){ if(err) throw err; })
    .success(function(docs){
        if(!docs){
            next();
        } else {
            req.posts = docs;
            next();
        }
    });
}