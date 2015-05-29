var db = require('../lib/monk'),
    posts = db.get('posts');

module.exports = function getMyPosts(req, res, next){
    var user = req.session.user;
    
    // Find published posts by logged in user
    posts
    .find({'author':user.username, 'draft': false}, {sort: {date: -1}})
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