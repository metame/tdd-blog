var router = require('express').Router(),
    getPosts = require('../middleware/getPosts.js'),
    getPost = require('../middleware/getPost.js');
    
router.get('/', getPosts, function(req, res){
    res.render('index',
        {
            title: "A blog written test-by-test",
            posts: req.posts
        }
    );
});

router.get('/posts/:permalink', getPost, getPosts, function(req, res){
    res.render('blogPost',{
        title: req.post.title,
        post: req.post,
        posts: req.posts
    });
});

module.exports = router;
    

