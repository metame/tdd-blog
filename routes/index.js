var router = require('express').Router(),
    db = require('../lib/monk'),
    posts = db.get('posts'),
    getPosts = require('../middleware/getPosts.js');
    
router.get('/', getPosts, function(req, res){
    res.render('index',
        {
            title: "A blog written test-by-test",
            posts: req.posts
        }
    );
});

module.exports = router;
    

