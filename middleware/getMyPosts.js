var db = require('../lib/monk'),
    posts = db.get('posts');

module.exports = function getMyPosts(req, res, next){
    var user = req.session.user;
    
    // Find published posts by logged in user
    posts
    .find({'author':user.username, 'draft': false})
    .error(function(err){ if(err) throw err; })
    .success(function(docs){
        if(!docs){
        } else {
            req.posts = docs;
        }
    });
    
    // Find draft posts by logged in user
    posts
    .find({'author':user.username, 'draft': true})
    .error(function(err){ if(err) throw err; })
    .success(function(docs){
        if(!docs){
            next();
        } else {
            req.drafts = docs;
            next();
        }
    });
    
}