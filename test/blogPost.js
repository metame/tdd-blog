var request = require('superagent'),
    expect = require('expect.js'),
    posts = require('../lib/monk').get('posts');

describe('Blog Home Page', function(){
    var latestPost;
    before(function(done){
        posts
            .find({draft: false},{sort: {date: -1}, limit: 1})
            .success(function(docs){
                latestPost = docs[0];
                done();
        });
    });
            
    it('should exist', function(done){
        request
        .get('localhost:8080/' + latestPost.permalink)
        .end(function(err, res){
            expect(err).to.not.exist;
           
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(latestPost.title);
           
            done();
        });
    });
});