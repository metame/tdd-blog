var request = require('superagent'),
    expect = require('expect.js'),
    posts = require('../lib/monk').get('posts'),
    tags = require('../lib/monk').get('tags');

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
    
    describe('Tag Cloud', function(){
        var tagsDocs;
        before(function(done){
            tags
                .find({},{'sort':{'freq':-1},'limit':10})
                .success(function(docs){
                    tagsDocs = docs;
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
                expect(res.text).to.contain("tags");
                if(tagsDocs[0] !== undefined){
                    tagsDocs.forEach(function(tag){
                        expect(res.text).to.contain(tag.tag); 
                    });
                }

                done();
            });
        });
    });
});