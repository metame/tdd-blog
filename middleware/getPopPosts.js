var db = require('../lib/monk'),
    posts = db.get('posts');

module.exports = function getPosts(req, res, next){

    // Find latest 10 posts
    posts
        .find({draft: false},{sort: {views: -1}, limit: 3})
        .success(function(docs){
            req.popular = docs;
            next();
    });
}