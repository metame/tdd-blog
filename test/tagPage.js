var request = require('superagent'),
    expect = require('expect.js'),
    db = require('../lib/monk'),
    tags = db.get('tags'),
    posts = db.get('posts');
    
describe('Tag page', function(){
    var testTag, tagPosts;
    before(function(done){
        tags.findOne().success(function(doc){
            testTag = doc.tag;
            tagPosts = doc.posts;
            done();
        });
    });
    
    it('should display posts that include defined tag', function(done){
        request
        .get('localhost:8080/tags/' + testTag)
        .end(function(err, res){
            expect(err).to.not.exist;
            
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(testTag);
            
            tagPosts.forEach(function(post){
                posts
                .findOne({permalink: post.permalink})
                .success(function(doc){
                    expect(res.text).to.contain(doc.title);
                });
            });
            
            done();
        });
    });
});