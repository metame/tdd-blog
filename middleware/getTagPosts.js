var db = require('../lib/monk'),
    posts = db.get('posts');

module.exports = function getTagPosts(req, res, next){
    var thisTag = req.params.tag;
    
    posts
        .find({draft: false, tags: req.params.tag},{sort: {date: -1}})
        .success(function(docs){
            req.tagPosts = docs;
            next();
    });
}