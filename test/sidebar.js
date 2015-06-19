var request = require('superagent'),
    expect = require('expect.js'),
    posts = require('../lib/monk').get('posts');

describe('Sidebar', function(){
    describe('Recent Posts', function(){
        var latestPosts;
        before(function(done){
            posts
                .find({draft: false},{sort: {date: -1}, limit: 3})
                .success(function(docs){
                    latestPosts = docs;
                    done();
            });
        });
        
        it('should show recent posts', function(done){
            request
            .get('localhost:8080/')
            .end(function(err, res){
                expect(err).to.not.exist;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain("Recent Posts");
                if(latestPosts[0] !== undefined){
                    latestPosts.forEach(function(post, index, posts){
                        expect(res.text).to.contain(post.title);
                    });
                }

                done();
            });
        });
    });
    
    describe('Popular Posts', function(){
        var popPosts;
        before(function(done){
            posts
                .find({draft: false},{sort: {views: -1}, limit: 3})
                .success(function(docs){
                    popPosts = docs;
                    done();
            });
        });
        
        it('should show popular posts', function(done){
            request
            .get('localhost:8080/')
            .end(function(err, res){
                expect(err).to.not.exist;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain("Popular Posts");
                if(popPosts[0] !== undefined){
                    popPosts.forEach(function(post, index, posts){
                        expect(res.text).to.contain(post.title);
                    });
                }

                done();
            });
        });
        
        
    });
    
    describe.skip('Tag Cloud', function(){
        var allPosts;
        before(function(done){
            posts
                .find({draft: false})
                .success(function(docs){
                    allPosts = docs;
                    done();
            });
        });

        it('should show tags', function(done){
            request
            .get('localhost:8080/')
            .end(function(err, res){
                expect(err).to.not.exist;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain("tag cloud");
                if(allPosts[0] !== undefined){
                    allPosts.forEach(function(post, index, posts){
                        expect(res.text).to.contain(post.tags[0]);  // app logic to be updated
                    });
                }

                done();
            });
        });
    });
});