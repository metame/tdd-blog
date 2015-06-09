var router = require('express').Router(),
    getPosts = require('../middleware/getPosts.js'),
    getPopPosts = require('../middleware/getPopPosts.js'),
    getPost = require('../middleware/getPost.js'),
    viewCounter = require('../middleware/viewCounter.js');
    
router.get('/', getPosts, getPopPosts, function(req, res){
    res.render('index',
        {
            title: "A blog written test-by-test",
            posts: req.posts,
            popular: req.popular
        }
    );
});

router.get('/posts/:permalink', getPost, viewCounter, getPosts, getPopPosts, function(req, res){
    res.render('blogPost',{
        title: req.post.title,
        post: req.post,
        posts: req.posts,
        popular: req.popular
    });
});

module.exports = router;
    

