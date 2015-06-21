var db = require('../lib/monk'),
    posts = db.get('posts');

module.exports = function getDraft(req, res, next){

    // Get post by permalink
    posts
        .findOne({draft: true, permalink: req.params.permalink})
        .success(function(doc){
            req.post = doc;
            next();
    });
}