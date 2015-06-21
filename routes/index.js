var router = require('express').Router(),
    getPosts = require('../middleware/getPosts.js'),
    getPopPosts = require('../middleware/getPopPosts.js'),
    getPost = require('../middleware/getPost.js'),
    getDraft = require('../middleware/getDraft.js'),
    getTags = require('../middleware/getTags.js'),
    viewCounter = require('../middleware/viewCounter.js'),
    getTagPosts = require('../middleware/getTagPosts'),
    ensureAuth = require('../middleware/ensureAuth');
    
router.get('/', getPosts, getPopPosts, getTags, function(req, res){
    res.render('index',
        {
            title: "A blog written test-by-test",
            posts: req.posts,
            popular: req.popular,
            tags: req.tags
        }
    );
});

router.get('/posts/:permalink', getPost, viewCounter, getPosts, getPopPosts, getTags, function(req, res){
    res.render('blogPost',{
        title: req.post.title,
        post: req.post,
        posts: req.posts,
        popular: req.popular,
        tags: req.tags
    });
});

router.get('/posts/preview/:permalink', ensureAuth, getDraft, getPosts, getPopPosts, getTags, function(req, res){
    res.render('previewPost',{
        title: "Preview of: " + req.post.title,
        post: req.post,
        posts: req.posts,
        popular: req.popular,
        tags: req.tags
    });
});

router.get('/tags/:tag', getPosts, getTagPosts, getPopPosts, getTags, function(req, res){
    res.render('tagPage',
        {
            title: "Posts about " + req.params.tag,
            posts: req.posts,
            tagPosts: req.tagPosts,
            popular: req.popular,
            tags: req.tags
        }
    );
});

module.exports = router;
    

