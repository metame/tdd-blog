var db = require('../lib/monk'),
    posts = db.get('posts');

module.exports = function getPosts(req, res, next){

    // Find latest 10 posts
    posts
        .find({draft: false},{sort: {date: -1}, limit: 10})
        .success(function(docs){
            req.posts = docs;
            next();
    });
}