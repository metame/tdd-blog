var request = require('superagent'),
    expect = require('expect.js'),
    posts = require('../lib/monk').get('posts');

describe('Preview Post', function(){
    var draft;
    before(function(done){
        posts
            .findOne({draft: true})
            .success(function(doc){
                draft = doc;
                done();
        });
    });
            
    it('should exist', function(done){
        request
        .get('localhost:8080/posts/' + latestPost.permalink)
        .end(function(err, res){
            expect(err).to.not.exist;
           
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            expect(res.text).to.contain(latestPost.title);
           
            done();
        });
    });
});