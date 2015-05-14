var request = require('superagent'),
    expect = require('expect.js');
    
describe('New Blog Post', function(){
    describe('New post page', function(){
        it('should exist and show form', function(done){
            
            request.get('localhost:8080/users/newPost').end(function(err, res){
                if(err) throw err;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect('form').to.exist;
                expect(res.text).to.contain('New Post');
                
                done();
            });
        });
    });
    
    describe('Submit New Post', function(){
        var newPost = {'title': 'Test blog post', 'body': 'Yes! This post worked!'};
        it('should accept valid entry', function(done){
            request
            .post('localhost:8080/users/newPost')
            .type('form')
            .send(newPost)
            .end(function(err, res){
                if(err) throw err;
                
                expect(res).to.exist;
                expect(res.status).to.equal(200);
                expect(res.text).to.contain('New post added!');
                expect(res.text).to.contain(newPost.title);
                expect(res.text).to.contain(newPost.body);
                
                done();
            });
        });
    });
});