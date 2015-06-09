var db = require('../lib/monk'),
    posts = db.get('posts');

module.exports = function countView(req, res, next){
    
    // if post is found increment views
    if(!req.post){
        console.log("no view counted");
        next();
    } else {
        var views = req.post.views;
        if(!views){
            // set to 1 to ensure counter increments
            views = 1;
        }
        posts
            .update(req.post, {"$set": {"views": views++}})
            .success(function(doc){
                next();
        });
    }
}